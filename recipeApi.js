const cardHolder = $("#test");

//added to in search
var basePath = "https://api.edamam.com/search?app_id=116c2f71&app_key=762f0ea87e686d609160c3fd1d23050c";

//balanced, high-protein, low-fat,  low-carb
var dietType = "";

//alcohol-free, peanut-free, sugar-conscious, tree-nut-free, vegan, vegetarian
var allergyAndHealth = "";

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

    var servingDisplay = $("<div>").addClass("recipe-search-card-servings").text("Serves " + servings);

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

    $(cardHolder).append(recipeHolder);
}

//called to search for recipes using the api
function searchForRecipes(mainIngredient){
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
            //TODO create code for what to do when search comes up empty
        }
    });
}

searchForRecipes("onion");