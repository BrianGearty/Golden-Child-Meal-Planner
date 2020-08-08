//saved to local storage with this tag
const localStorageRecipes = "golden-child-Recipes";
const localStorageCocktails = "golden-child-Cocktails";

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

function saveNewCocktail(drinkName, ingredientList, drinkRecipe, drinkThumbnailSrc){
    //save it as an object
    var newFavorite = {
        name: drinkName, 
        ingredients: ingredientList,
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