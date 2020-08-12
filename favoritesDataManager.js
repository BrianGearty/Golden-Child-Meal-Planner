//saved to local storage with this tag
const localStorageRecipes = "golden-child-Recipes";
const localStorageCocktails = "golden-child-Cocktails";

//access holders on favorites.html
const recipesFavHolder = $("#recipes-holder");
const cocktailsFavHolder = $("#cocktail-holder");

var favoriteRecipes = [];
var favoriteCocktails = [];

//loads saved data at start
var loadRecipes = JSON.parse(localStorage.getItem(localStorageRecipes));
var loadCocktails = JSON.parse(localStorage.getItem(localStorageCocktails));
if(loadRecipes != null){
    favoriteRecipes = loadRecipes;
}
if(loadCocktails != null){
    favoriteCocktails = loadCocktails;
}

function saveNewRecipe(recipeName, ingredientsList, healthLabels, numberOfServings, recipeUrl, imageUrl){
    var newFavorite = {
        name: recipeName,
        ingredients: ingredientsList,
        health: healthLabels,
        servings: numberOfServings,
        recipeLink: recipeUrl,
        image: imageUrl
    }

    favoriteRecipes.push(newFavorite);

    localStorage.setItem(localStorageRecipes, JSON.stringify(favoriteRecipes));
}

function saveNewCocktail(drinkName, ingredientsList, drinkRecipe, drinkThumbnailSrc){
    //save it as an object
    var newFavorite = {
        name: drinkName, 
        ingredients: ingredientsList,
        recipe: drinkRecipe,
        srcUrl: drinkThumbnailSrc
    }

    favoriteCocktails.push(newFavorite);

    localStorage.setItem(localStorageCocktails, JSON.stringify(favoriteCocktails));
}

//remove recipe from favorites
function removeRecipeFromFavorites(index){
    favoriteRecipes.splice(index, 1);

    localStorage.setItem(localStorageRecipes, JSON.stringify(favoriteRecipes));
}

//remove cocktail from favorites
function removeCocktailFromFavorites(index){
    favoriteCocktails.splice(index, 1);

    localStorage.setItem(localStorageCocktails, JSON.stringify(favoriteCocktails));
}

//display favs if there
if(recipesFavHolder.length > 0){
    if(favoriteRecipes.length > 0){
        $.each(favoriteRecipes, function(i, index){
            //name, ingredients, healthLabels, servings, recipeUrl, imageUrl
            var name = index.name;
            var ingredients = index.ingredients;
            var healthLabels = index.health;
            var servings = index.servings;
            var recipeUrl = index.recipeLink;
            var imageUrl = index.image;

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

            //remove from favorites button
            var removeFromFavoritesButton = $("<button>").addClass("btn btn-danger").val(i).click(function(){
                var recipeHolder = $(this).parents(".recipe-search-card-holder")[0];
                removeRecipeFromFavorites($(this).val());
                $(recipeHolder).remove();
            }).text("Remove From Favorites");

            $(recipeHolder).append(addScheduleDropdownsRecipe(), $("<br>") ,removeFromFavoritesButton);

            $(recipesFavHolder).append(recipeHolder);
        });
    }
    if(favoriteCocktails.length > 0){
        $.each(favoriteCocktails, function(i, index){
            var drinkName = index.name;
            var ingrediantList = index.ingredients;
            var drinkRecipe = index.recipe;
            var drinkThumbnailSrc = index.srcUrl;

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

            //remove from favorites button
            var removeFromFavoritesButton = $("<button>").addClass("btn btn-danger").val(i).click(function(){
                var cocktailHolder = $(this).parents(".cocktail-search-card-holder")[0];
                removeCocktailFromFavorites($(this).val());
                $(cocktailHolder).remove();
            }).text("Remove From Favorites");

            var schedule = addScheduleDropdownsCocktail();

            $(cocktailHolder).append(drinkImage, nameDisplay, ingredientsHolder, recipeHolder, schedule, removeFromFavoritesButton);

            $(cocktailsFavHolder).append(cocktailHolder);
        })
    }
}