const cardHolder = $("#recipe-card-holder");
const mainIngredientInputField = $("#recipe-main-ingredient")
const searchButton = $("#search-recipe-button")

//loads saved data of favorited recipes if found
var favoritedRecipes = JSON.parse(localStorage.getItem("golden-child-Recipes"));

//added to in search
const basePath = "https://api.edamam.com/search?app_id=116c2f71&app_key=762f0ea87e686d609160c3fd1d23050c";

//balanced, high-protein, low-fat, low-carb
var dietType = "";

//alcohol-free, peanut-free, sugar-conscious, tree-nut-free, vegan, vegetarian
var allergyAndHealth = "";

function addScheduleDropdownsRecipe(){
    var buttonsHolder = $("<div>").addClass("row schedule-buttons-holder");
    var monthHolder = $("<div>").addClass("dropdown month-holder");
    var monthButton = $("<button>").addClass("btn btn-primary dropdown-toggle month-button").attr({
        "type": "button",
        "data-toggle": "dropdown",
        "aria-haspopup": "true",
        "aria-expanded": "false"
        //using a span so changing it doesn't override the dropdowns, using moment to set the current month
    }).html(`<span>Month: ${moment().format("MMMM")}</span>`).val(0);
    var monthDropdown = $("<div>").addClass("dropdown-menu month-dropdown");

    //TODO have it loop for each month
    for(var i = 0; i < 3; i++){
        //create dropdowns and add function
        //TODO store month in val, or text or something
        var newDropdown = $("<button>").addClass("dropdown-item").attr("type", "button").val(i).text(moment().add(i, "month").format("MMMM")).click(function(event){
            var monthHolder = $(this).parents(".month-holder")[0];
            //access the button this item drops down from
            var monthButton = $(monthHolder).children();
            //have button display selected month
            $(monthButton.children("span")).text("Month: " + $(this).text());
            $(monthButton).val($(this).val());

            //access day button to reset days
            var dayHolder = $(monthHolder).siblings(".day-holder")[0];
            var dayButton = $(dayHolder).children(".day-button")[0];
            var dayDropdown = $(dayHolder).children(".day-dropdown")[0];

            //clear dropdown buttons so new ones can be added
            $(dayDropdown).empty();
            
            //current month
            if($(this).val() == 0){
                //set to current day, info for function stored in val
                $(dayButton).html(`<span>Day: ${moment().format("D")}</span>`).val(moment().format("D") - 1);
                for(var i = moment().format("D"); i <= moment().daysInMonth(); i++){
                    //create dropdowns and add function
                    //TODO store day in val, or text or something
                    var newDropdown = $("<button>").addClass("dropdown-item").attr("type", "button").val(i).text(i).click(function(event){
                        var dayHolder = $(this).parents(".day-holder")[0];
                        var dayButton = $(dayHolder).children();
                        $(dayButton.children("span")).text("Day: " + $(this).val());
                        $(dayButton).val($(this).val() - 1);
                    });
                    $(dayDropdown).append(newDropdown);
                }
            }
            //future month
            else
            {
                $(dayButton).html(`<span>Day: 1`).val(0);
                for(var i = 1; i <= moment().daysInMonth(); i++){
                    //create dropdowns and add function
                    //TODO store day in val, or text or something
                    var newDropdown = $("<button>").addClass("dropdown-item").attr("type", "button").val(i).text(i).click(function(event){
                        var dayHolder = $(this).parents(".day-holder")[0];
                        var dayButton = $(dayHolder).children();
                        $(dayButton.children("span")).text("Day: " + $(this).val());
                        $(dayButton).val($(this).val() - 1);
                    });
                    $(dayDropdown).append(newDropdown);
                }
            }
        });
        $(monthDropdown).append(newDropdown);
    }

    $(monthHolder).append(monthButton, monthDropdown);
    
    var dayHolder = $("<div>").addClass("dropdown day-holder");
    var dayButton = $("<button>").addClass("btn btn-primary dropdown-toggle day-button").attr({
        "type": "button",
        "data-toggle": "dropdown",
        "aria-haspopup": "true",
        "aria-expanded": "false"
        //using a span so changing it doesn't override the dropdowns
    }).html(`<span>Day: ${moment().format("D")}</span>`).val(moment().format("D") - 1);
    var dayDropdown = $("<div>").addClass("dropdown-menu day-dropdown");

    //TODO have it loop for each day
    for(var i = moment().format("D"); i <= moment().daysInMonth(); i++){
        //create dropdowns and add function
        //TODO store day in val, or text or something
        var newDropdown = $("<button>").addClass("dropdown-item").attr("type", "button").val(i).text(i).click(function(event){
            var dayHolder = $(this).parents(".day-holder")[0];
            var dayButton = $(dayHolder).children();
            $(dayButton.children("span")).text("Day: " + $(this).val());
            $(dayButton).val($(this).val() - 1);
        });
        $(dayDropdown).append(newDropdown);
    }

    $(dayHolder).append(dayButton, dayDropdown);

    //make the button that save it
    var scheduleButton = $("<button>").addClass("btn btn-primary").text("Schedule").click(function(){
        $(this).text("Added to Calendar");

        //access the card that all the info is stored in
        var wholeCard = $(this).parents(".recipe-search-card-holder")[0];
        //recipe name
        var recipeName = $(wholeCard).children(".recipe-search-card-name").text();
        //an in-between variable used for processing the list into an array for ingredientsList
        var listHolder = $(wholeCard).children(".recipe-search-card-ingredients-ol")[0];
        var ingredientsList = [];
        $.each($(listHolder).children("li"), function(i, index){
            ingredientsList.push(index.textContent);
        });
        
        //an in-between variable used for processing the list into an array for healthLabels
        var healthHolder = $(wholeCard).children(".recipe-search-card-health-ul")[0];
        var healthLabels = [];
        $.each($(healthHolder).children("li"), function(i, index){
            healthLabels.push(index.textContent);
        });

        //I stored the this one in a custom attribute so parseInt could be run easier
        var numberOfServings = $(wholeCard).children(".recipe-search-card-servings").attr("data-val");
        //turns it from a string to a number
        numberOfServings = parseInt(numberOfServings);

        var recipeUrl = $(wholeCard).children(".recipe-search-card-button").attr("href");
        
        var imageUrl = $(wholeCard).children(".recipe-search-card-image").attr("src");

        var monthIndex = $($(wholeCard).find(".month-button")[0]).val();

        var dayMinusOne = $($(wholeCard).find(".day-button")[0]).val();

        saveRecipeToCalendar(monthIndex, dayMinusOne, recipeName, ingredientsList, healthLabels, numberOfServings, recipeUrl, imageUrl)
    });

    $(buttonsHolder).append(monthHolder, dayHolder, scheduleButton);

    return(buttonsHolder);
}

//called by displaySearchedRecipes
function addFavoritesButtonToCard(recipeName){
    var holder = $("<div>").addClass("row recipe-search-card-favorites-holder");
    var favText = $("<div>").addClass("col-7 recipe-search-card-favorites-text");
    var favImg = $("<img>").addClass("col-3 recipe-search-card-favorites-img");

    if(favoritedRecipes != null){
        var checkIfFavorite = false;
        //check if already favorite
        $.each(favoritedRecipes, function(i, index){
            if(index.name == recipeName){
                checkIfFavorite = true;
            }
        });
        //if favorite
        if(checkIfFavorite){
            $(favText).text("One of your Favorites");
            $(favImg).attr("src", "./icons/favorited.png");
        }
        //if NOT favorite
        else{
            $(favText).text("Add to Favorites");
            $(favImg).attr("src", "./icons/not-favorited.png").click(function(event){
                //makes sure the function only runs once
                $(this).off();
                //access the card that all the info is stored in
                var wholeCard = $(this).parents(".recipe-search-card-holder")[0];
                //an in-between variable used for processing the list into an array for ingredientsList
                var listHolder = $(wholeCard).children(".recipe-search-card-ingredients-ol")[0];
                var ingredientsList = [];
                $.each($(listHolder).children("li"), function(i, index){
                    ingredientsList.push(index.textContent);
                });
                
                //an in-between variable used for processing the list into an array for healthLabels
                var healthHolder = $(wholeCard).children(".recipe-search-card-health-ul")[0];
                var healthLabels = [];
                $.each($(healthHolder).children("li"), function(i, index){
                    healthLabels.push(index.textContent);
                });
    
                //I stored the this one in a custom attribute so parseInt could be run easier
                var numberOfServings = $(wholeCard).children(".recipe-search-card-servings").attr("data-val");
                //turns it from a string to a number
                numberOfServings = parseInt(numberOfServings);
    
                var recipeUrl = $(wholeCard).children(".recipe-search-card-button").attr("href");
                
                var imageUrl = $(wholeCard).children(".recipe-search-card-image").attr("src");
                
                //imported function from favoritesDataManager.js
                saveNewRecipe(recipeName, ingredientsList, healthLabels, numberOfServings, recipeUrl, imageUrl);
    
                $(favText).text("One of your Favorites");
                $(favImg).attr("src", "./icons/favorited.png");
            }); 
        }
    //if no save data found, don't bother checking for favorites
    }else{
        $(favText).text("Add to Favorites");
        $(favImg).attr("src", "./icons/not-favorited.png").click(function(event){
            //makes sure the function only runs once
            $(this).off();
            //access the card that all the info is stored in
            var wholeCard = $(this).parents(".recipe-search-card-holder")[0];
            //an in-between variable used for processing the list into an array for ingredientsList
            var listHolder = $(wholeCard).children(".recipe-search-card-ingredients-ol")[0];
            var ingredientsList = [];
            $.each($(listHolder).children("li"), function(i, index){
                ingredientsList.push(index.textContent);
            });
            
            //an in-between variable used for processing the list into an array for healthLabels
            var healthHolder = $(wholeCard).children(".recipe-search-card-health-ul")[0];
            var healthLabels = [];
            $.each($(healthHolder).children("li"), function(i, index){
                healthLabels.push(index.textContent);
            });

            //I stored the this one in a custom attribute so parseInt could be run easier
            var numberOfServings = $(wholeCard).children(".recipe-search-card-servings").attr("data-val");
            //turns it from a string to a number
            numberOfServings = parseInt(numberOfServings);

            var recipeUrl = $(wholeCard).children(".recipe-search-card-button").attr("href");
            
            var imageUrl = $(wholeCard).children(".recipe-search-card-image").attr("src");
            
            //imported function from favoritesDataManager.js
            saveNewRecipe(recipeName, ingredientsList, healthLabels, numberOfServings, recipeUrl, imageUrl);

            $(favText).text("One of your Favorites");
            $(favImg).attr("src", "./icons/favorited.png");
        });  
    }
    
    $(holder).append(favText, favImg);

    //returns the holder to append it to the end of the card
    return holder;
}

//called from the searchForRecipes function when it loops through the list of recipes
function displaySearchedRecipe(name, ingredients, healthLabels, servings, recipeUrl, imageUrl){
    //TODO write code to display recipes
    var recipeHolder = $("<div>").addClass("recipe-search-card-holder");
    var nameDisplay = $("<h2>").addClass("recipe-search-card-name").text(name);
    //put ingredients into an ordered list
    var ingredientsHolder = $("<ol>").addClass("recipe-search-card-ingredients-ol");
    $.each(ingredients, function(i, index){
        var currentIngredient = $("<li>").text(index);
        $(ingredientsHolder).append(currentIngredient);
    });

    var healthHolder = $("<ul>").addClass("recipe-search-card-health-ul");
    var checkForHealthLabels = false;
    //check to see if there's any health labels
    if(healthLabels.length > 0){
        checkForHealthLabels = true;
        var healthTitle = $("<div>").addClass("recipe-search-card-health-ul-title").text("Health Label(s):")
        $(healthHolder).append(healthTitle);
        $.each(healthLabels, function(i, index){
            var currentHealth = $("<li>").text(index);
            $(healthHolder).append(currentHealth);
        });
    }

    var servingDisplay = $("<div>").addClass("recipe-search-card-servings").text("Serves " + servings).attr("data-val", servings);

    var recipeButton = $("<a>").addClass("recipe-search-card-button").text("Click To Get Recipe")
        .attr({"href": recipeUrl, "target": "_blank"});

    var recipeImage = $("<img>").addClass("recipe-search-card-image").attr("src", imageUrl);

    //check if there are any health labels
    if(checkForHealthLabels){
        $(recipeHolder).append(nameDisplay, recipeImage, ingredientsHolder, healthHolder, servingDisplay, recipeButton);
    }
    else
    {
        $(recipeHolder).append(nameDisplay, recipeImage, ingredientsHolder, servingDisplay, recipeButton);
    }

    //add favorites button
    $(recipeHolder).append(addScheduleDropdownsRecipe(), addFavoritesButtonToCard(name));

    $(cardHolder).append(recipeHolder);
}

//called to search for recipes using the api
function searchForRecipes(){
    var mainIngredient = $(mainIngredientInputField).val();
    //adds the query to the API url
    var urlPath = basePath;
    urlPath += "&q=" + mainIngredient;

    //add diet type if selected
    if(dietType){
        urlPath += "&diet=" + dietType;
    }
    //add Allergy and Health search modifier if selected
    if(allergyAndHealth){
        urlPath += "&health=" + allergyAndHealth;
    }
    $.ajax({
        url: urlPath,
        method: "GET"
    }).then(function(response){
        //clearn holder when new search is run
        $(cardHolder).empty();
        if(response.hits.length > 0){
            //the up to 10 returned from search
            var listOfRecipies = response.hits;
    
            //loop through the recipes
            $.each(listOfRecipies, function(i, index){
                var currentRecipe = index.recipe;
                
                displaySearchedRecipe(currentRecipe.label, currentRecipe.ingredientLines, currentRecipe.healthLabels,
                    currentRecipe.yield, currentRecipe.url, currentRecipe.image);
            });
        }
        else
        {
            $(cardHolder).empty();
            //TODO create code for what to do when search comes up empty
            
            //create display holder
            var noRecipesFoundHolder = $("<div>").addClass("recipe-error-holder container");
            var noRecipesTitle = $("<h3>").addClass("recipe-error-title").text("No Recipes Found");
            var noRecipesText = $("<div>").addClass("recipe-error-text").text("Try a different search term");

            //add info to holder, and holder to display
            $(noRecipesFoundHolder).append(noRecipesTitle, noRecipesText);
            $(cardHolder).append(noRecipesFoundHolder);
        }
    });
}

$(searchButton).click(searchForRecipes);

//add function to diet type radio buttons
$(".diet-type-button").click(function(event){
    dietType = $(this).val();
});

//add function to diet type radio buttons
$(".health-type-button").click(function(event){
    allergyAndHealth = $(this).val();
});