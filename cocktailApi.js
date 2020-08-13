//where recipes are displayed
const displayHolder = $("#cocktail-card-holder");

//number of drink recipies displayed
const numberOfDrinksSearched = 5;
var searchedDrinksArray = [];

//loads saved data of favorited recipes if found
var favoritedCocktails = JSON.parse(localStorage.getItem("golden-child-Cocktails"));

function addScheduleDropdownsCocktail(){
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
        var wholeCard = $(this).parents(".cocktail-search-card-holder")[0];
        var drinkName = $($(wholeCard).children(".cocktail-search-card-name")[0]).text();
        //an in-between variable used for processing the list into an array for ingredientsList
        var listHolder = $(wholeCard).children(".cocktail-search-card-ingredients-ol")[0];
        var ingredientsList = [];
        $.each($(listHolder).children("li"), function(i, index){
            ingredientsList.push(index.textContent);
        });

        var drinkRecipe = $(wholeCard).children(".cocktail-search-card-recipe").text();
        
        var drinkThumbnailSrc = $(wholeCard).children(".cocktail-search-card-image").attr("src");

        var monthIndex = $($(wholeCard).find(".month-button")[0]).val();

        var dayMinusOne = $($(wholeCard).find(".day-button")[0]).val();

        saveCocktailToCalendar(monthIndex, dayMinusOne, drinkName, ingredientsList, drinkRecipe, drinkThumbnailSrc);
    });

    $(buttonsHolder).append(monthHolder, dayHolder, scheduleButton);

    return(buttonsHolder);
}

//called by displaySearchedInformation
function addFavoritesButtonToCardCocktail(drinkName){
    var holder = $("<div>").addClass("row cocktail-search-card-favorites-holder");
    var favText = $("<div>").addClass("col-7 cocktail-search-card-favorites-text");
    var favImg = $("<img>").addClass("col-3 cocktail-search-card-favorites-img");

    if(favoritedCocktails != null){
        var checkIfFavorite = false;
        //check if already favorite
        $.each(favoritedCocktails, function(i, index){
            if(index.name == drinkName){
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
            $(favText).text("Click Heart to Add to Favorites");
            $(favImg).attr("src", "./icons/not-favorited.png").click(function(event){
                //makes sure the function only runs once
                $(this).off();
                //access the card that all the info is stored in
                var wholeCard = $(this).parents(".cocktail-search-card-holder")[0];
                //an in-between variable used for processing the list into an array for ingredientsList
                var listHolder = $(wholeCard).children(".cocktail-search-card-ingredients-ol")[0];
                var ingredientsList = [];
                $.each($(listHolder).children("li"), function(i, index){
                    ingredientsList.push(index.textContent);
                });
    
                var drinkRecipe = $(wholeCard).children(".cocktail-search-card-recipe").text();
                
                var drinkThumbnailSrc = $(wholeCard).children(".cocktail-search-card-image").attr("src");
                
                //imported function from favoritesDataManager.js
                saveNewCocktail(drinkName, ingredientsList, drinkRecipe, drinkThumbnailSrc);

                $(favText).text("One of your Favorites");
                $(favImg).attr("src", "./icons/favorited.png");
            });
        }
    //if no save data found, don't bother checking for favorites
    }else{
        $(favText).text("Click Heart to Add to Favorites");
        $(favImg).attr("src", "./icons/not-favorited.png").click(function(event){
            //makes sure the function only runs once
            $(this).off();
            //access the card that all the info is stored in
            var wholeCard = $(this).parents(".cocktail-search-card-holder")[0];
            //an in-between variable used for processing the list into an array for ingredientsList
            var listHolder = $(wholeCard).children(".cocktail-search-card-ingredients-ol")[0];
            var ingredientsList = [];
            $.each($(listHolder).children("li"), function(i, index){
                ingredientsList.push(index.textContent);
            });

            var drinkRecipe = $(wholeCard).children(".cocktail-search-card-recipe").text();
            
            var drinkThumbnailSrc = $(wholeCard).children(".cocktail-search-card-image").attr("src");
            
            //imported function from favoritesDataManager.js
            saveNewCocktail(drinkName, ingredientsList, drinkRecipe, drinkThumbnailSrc);

            $(favText).text("One of your Favorites");
            $(favImg).attr("src", "./icons/favorited.png");
        });
    }
    
    $(holder).append(favText, favImg);

    //returns the holder to append it to the end of the card
    return holder;
}

//called at the end of the search functions do display the info
function displaySearchedInformation(drinkName, ingrediantList, drinkRecipe, drinkThumbnailSrc){
    //TODO create display function
    var cocktailHolder = $("<div>").addClass("cocktail-search-card-holder");
    var nameDisplay = $("<h2>").addClass("cocktail-search-card-name").text(drinkName);
    //put ingredients into an ordered list
    var ingredientsHolder = $("<ol>").addClass("cocktail-search-card-ingredients-ol");
    $.each(ingrediantList, function(i, index){
        var currentIngredient = $("<li>").text(index);
        $(ingredientsHolder).append(currentIngredient);
    });

    var recipeHolder = $("<div>").addClass("cocktail-search-card-recipe").text(drinkRecipe);

    var drinkImage = $("<img>").addClass("cocktail-search-card-image").attr("src", drinkThumbnailSrc);

    $(cocktailHolder).append(nameDisplay, drinkImage, ingredientsHolder, recipeHolder);

    //add favorites bar
    $(cocktailHolder).append(addScheduleDropdownsCocktail(), addFavoritesButtonToCardCocktail(drinkName));

    $(displayHolder).append(cocktailHolder);
}

//get a random cocktail
function getRandomDrinkRecipe(){
    var urlPath = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

    $.ajax({
        url: urlPath,
        method: "GET"
    }).then(function(response){
        //the info about the actual drink
        var drinkInfo = response.drinks[0];

        //the name of the drink
        var drinkName = drinkInfo.strDrink;
        
        //the list will be generated by the following for loop
        var ingrediantList = [];
        
        //loops throught the ingredients list
        for(var i = 1; i <= 15; i++){
            //they didn't put the ingredients in an array, so this is how I have to loop through them 
            var ingrediant = "strIngredient" + i;
            var amount = "strMeasure" + i;

            //and here I thought this method of accessing an object's properties would never come in handy
            //turns out it's great when the name of that property can be generated in the form of a string!
            if(drinkInfo[ingrediant] != null){
                if(drinkInfo[amount] != null)
                {
                    var newIngredient = drinkInfo[ingrediant] + ": " + drinkInfo[amount];
                    ingrediantList.push(newIngredient);
                }
                else 
                {
                    var newIngredient = drinkInfo[ingrediant];
                    ingrediantList.push(newIngredient);
                }
                //ends the loop if its gone through all the ingredients
            }else{
                break;
            }
        }

        //the recipe of the drink
        var drinkRecipe = drinkInfo.strInstructions;

        //the url to an image of the drink. Be sure to add it to the src of the acompanying image
        var drinkThumbnailSrc = drinkInfo.strDrinkThumb;

        $(displayHolder).empty();
        displaySearchedInformation(drinkName, ingrediantList, drinkRecipe, drinkThumbnailSrc);
    });
}

//NOT accessed by user, is used by searchCocktailByIngrediant
function searchByID(id){
    var urlPath = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id;

    $.ajax({
        url: urlPath,
        method: "GET"
    }).then(function(response){
        //check to make sure the search term returned a recipe
        //the rest of the code related to retrieving info from the response goes in here
        if(response.drinks != null)
        {
            var drinkInfo = response.drinks[0];

            //the name of the drink
            var drinkName = drinkInfo.strDrink;
            
            //the list will be generated by the following for loop
            var ingrediantList = [];
            
            //loops throught the ingredients list
            for(var i = 1; i <= 15; i++){
                //they didn't put the ingredients in an array, so this is how I have to loop through them 
                var ingrediant = "strIngredient" + i;
                var amount = "strMeasure" + i;

                //and here I thought this method of accessing an object's properties would never come in handy
                //turns out it's great when the name of that property can be generated in the form of a string!
                if(drinkInfo[ingrediant] != null){
                    if(drinkInfo[amount] != null)
                    {
                        var newIngredient = drinkInfo[ingrediant] + ": " + drinkInfo[amount];
                        ingrediantList.push(newIngredient);
                    }
                    else 
                    {
                        var newIngredient = drinkInfo[ingrediant];
                        ingrediantList.push(newIngredient);
                    }
                    //ends the loop if its gone through all the ingredients
                }else{
                    break;
                }
            }

            //the recipe of the drink
            var drinkRecipe = drinkInfo.strInstructions;

            //the url to an image of the drink. Be sure to add it to the src of the acompanying image
            var drinkThumbnailSrc = drinkInfo.strDrinkThumb;

            displaySearchedInformation(drinkName, ingrediantList, drinkRecipe, drinkThumbnailSrc);
        }
        else
        {
            //TODO let the user know when the search failed
            console.log("No Recipes Found")
        }
    });
}

//search cocktail by name
function searchCocktailByName(name){
    var urlPath = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + name;

    $.ajax({
        url: urlPath,
        method: "GET"
    }).then(function(response){
        //check to make sure the search term returned a recipe
        //the rest of the code related to retrieving info from the response goes in here
        if(response.drinks != null)
        {
            var drinkInfo = response.drinks[0];

            //the name of the drink
            var drinkName = drinkInfo.strDrink;
            
            //the list will be generated by the following for loop
            var ingrediantList = [];
            
            //loops throught the ingredients list
            for(var i = 1; i <= 15; i++){
                //they didn't put the ingredients in an array, so this is how I have to loop through them 
                var ingrediant = "strIngredient" + i;
                var amount = "strMeasure" + i;

                //and here I thought this method of accessing an object's properties would never come in handy
                //turns out it's great when the name of that property can be generated in the form of a string!
                if(drinkInfo[ingrediant] != null){
                    if(drinkInfo[amount] != null)
                    {
                        var newIngredient = drinkInfo[ingrediant] + ": " + drinkInfo[amount];
                        ingrediantList.push(newIngredient);
                    }
                    else 
                    {
                        var newIngredient = drinkInfo[ingrediant];
                        ingrediantList.push(newIngredient);
                    }
                    //ends the loop if its gone through all the ingredients
                }else{
                    break;
                }
            }

            //the recipe of the drink
            var drinkRecipe = drinkInfo.strInstructions;

            //the url to an image of the drink. Be sure to add it to the src of the acompanying image
            var drinkThumbnailSrc = drinkInfo.strDrinkThumb;

            $(displayHolder).empty();
            displaySearchedInformation(drinkName, ingrediantList, drinkRecipe, drinkThumbnailSrc);
        }
        else
        {
            $(displayHolder).empty();
            
            //create display holder
            var noRecipesFoundHolder = $("<div>").addClass("cocktail-error-holder");
            var noRecipesTitle = $("<h3>").addClass("cocktail-error-title").text("No Recipes Found");
            var noRecipesText = $("<div>").addClass("cocktail-error-text").text("Try a different search term");

            //add info to holder, and holder to display
            $(noRecipesFoundHolder).append(noRecipesTitle, noRecipesText);
            $(displayHolder).append(noRecipesFoundHolder);
        }
    });
}

//called from searchCocktailByIngrediant
function pickRandomFromArray(array, amount){
    var inputArray = array;
    searchedDrinksArray = [];
    for(var i = 0; i < amount; i++){
        var randomNumber = Math.floor(Math.random() * inputArray.length);
        searchedDrinksArray.push(inputArray.splice(randomNumber, 1))
    }
}

//search by ingrediant
function searchCocktailByIngrediant(ingrediant){
    var urlPath = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingrediant;

    $.ajax({
        url: urlPath,
        method: "GET"
    }).then(function(response){
        //make sure it actually got a response
        if(response != ""){
            //clear the holder at the start
            $(displayHolder).empty();
    
            pickRandomFromArray(response.drinks, numberOfDrinksSearched);
    
            $.each(searchedDrinksArray, function(i, value){
                searchByID(value[0].idDrink);
            })
        }
        else{
            $(displayHolder).empty();
            
            //create display holder
            var noRecipesFoundHolder = $("<div>").addClass("cocktail-error-holder");
            var noRecipesTitle = $("<h3>").addClass("cocktail-error-title").text("No Recipes Found");
            var noRecipesText = $("<div>").addClass("cocktail-error-text").text("Try a different search term");

            //add info to holder, and holder to display
            $(noRecipesFoundHolder).append(noRecipesTitle, noRecipesText);
            $(displayHolder).append(noRecipesFoundHolder);
        }
    });
}

//assigne function to search buttons
$("#cocktail-search-name").click(function(){
    var cocktailName = $("#cocktail-name-field").val();
    searchCocktailByName(cocktailName);
});

$("#cocktail-search-Ingredient").click(function(){
    var cocktailIngredient = $("#cocktail-Ingredient-field").val();
    searchCocktailByIngrediant(cocktailIngredient);
});

$("#random-cocktail").click(getRandomDrinkRecipe);