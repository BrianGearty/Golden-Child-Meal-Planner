$(document).ready(function() {
    //where recipes are displayed
    const displayHolder = $("#test");

    //number of drink recipies displayed
    const numberOfDrinksSearched = 5;
    var searchedDrinksArray = [];

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

        $(cocktailHolder).append(drinkImage, nameDisplay, ingredientsHolder, recipeHolder);

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

            //TODO create script that displays this info in the html
            console.log(drinkName);
            $.each(ingrediantList, function(i, index){
                console.log(index);
            });
            console.log(drinkRecipe);
            console.log(drinkThumbnailSrc);

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

                //TODO create script that displays this info in the html
                console.log(drinkName);
                $.each(ingrediantList, function(i, index){
                    console.log(index);
                });
                console.log(drinkRecipe);
                console.log(drinkThumbnailSrc);
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

                //TODO create script that displays this info in the html
                console.log(drinkName);
                $.each(ingrediantList, function(i, index){
                    console.log(index);
                });
                console.log(drinkRecipe);
                console.log(drinkThumbnailSrc);

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
            console.log(response);
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

    searchCocktailByName("mojito");
});