const localStorageRecipeCalendar = "GCR-Cal-20200808";
const localStorageCocktailCalendar = "GCC-Cal-20200808";
const monthsTracked = 3;

var calendarRecipes = [];
var calendarCocktails = [];

var loadRecipes = JSON.parse(localStorage.getItem(localStorageRecipeCalendar));
var loadCocktails = JSON.parse(localStorage.getItem(localStorageCocktailCalendar));

//create empty recipe object
//used by loopMonthsToCreateNewDates and the for-loop that's run when no save data is found
//properties: recipeOnThisDate, name, ingrediants, healthLabels, servings, recipeUrl, imageUrl
//methods: scheculeRecipe(_name, _ingredients, _healthLabels, _servings, _recipeUrl, _imageUrl), cancelRecipe()
function createBlankRecipe(){
    var recipeInfo = {
        //ste true if recipe has been selected
        recipeOnThisDate: false,
        name: "", 
        ingredients: [], 
        healthLabels: [], 
        servings: 0, 
        recipeUrl: "", 
        imageUrl: "",

        //method to save data
        scheduleRecipe: function(_name, _ingredients, _healthLabels, _servings, _recipeUrl, _imageUrl){
            this.recipeOnThisDate = true;
            this.name = _name;
            this.ingredients = _ingredients;
            this.healthLabels = _healthLabels;
            this.servings = _servings;
            this.recipeUrl = _recipeUrl;
            this.imageUrl = _imageUrl;
        },

        //method to remove recipe
        cancelRecipe: function(){
            this.recipeOnThisDate = false;
            this.name = "";
            this.ingredients = [];
            this.healthLabels = [];
            this.servings = 0;
            this.recipeUrl = "";
            this.imageUrl = "";
        }
    };

    return recipeInfo;
}

function createBlankCocktail(){
    var cocktailInfo = {
        cocktailOnThisDate: false,
        drinkName: "", 
        ingrediantList: [], 
        drinkRecipe: "", 
        drinkThumbnailSrc: "",

        scheduleCocktail: function(_drinkName, _ingrediantList, _drinkRecipe, _drinkThumbnailSrc){
            this.cocktailOnThisDate = true;
            this.drinkName = _drinkName;
            this.ingrediantList = _ingrediantList;
            this.drinkRecipe = _drinkRecipe;
            this.drinkThumbnailSrc = _drinkThumbnailSrc;
        },

        cancelCocktail: function(){
            this.cocktailOnThisDate = false;
            this.drinkName = "";
            this.ingrediantList = [];
            this.drinkRecipe = "";
            this.drinkThumbnailSrc = "";
        }
    };

    return cocktailInfo;
}

//called at start to create new recipes
function createNewDatesForRecipes(){
    //get start of current month to check against the first value of the array 
    var currentMonth = parseInt(moment().startOf("month").format("YYYYMMDD"));

    //check if current month is the first month in the array
    if(calendarRecipes[0].calendarDate < currentMonth){
        calendarRecipes.shift();

        var newMonth = {
            //sets it to the date 2 months from the date at index 0
            calendarDate: parseInt(moment(calendarRecipes[0].calendarDate.toString()).add(monthsTracked - 1, "month").format("YYYYMMDD")),
            scheduledRecipes: []
        }
        for(var u = 0; u < daysInCurrentMonth; u++){
            //saves recipe object at calendarRecipes[i].scheduledRecipes at index of the day-of-month minus 1
            newMonth.scheduledRecipes.push(createBlankRecipe());
        }

        calendarRecipes.push(newMonth);

        localStorage.setItem(localStorageRecipeCalendar, JSON.stringify(calendarRecipes));

        createNewDatesForRecipes();
    }
}

function createNewDatesForCocktails(){
    //get start of current month to check against the first value of the array 
    var currentMonth = parseInt(moment().startOf("month").format("YYYYMMDD"));

    //check if current month is the first month in the array
    if(calendarCocktails[0].calendarDate < currentMonth){
        calendarCocktails.shift();

        var newMonth = {
            //sets it to the date 2 months from the date at index 0
            calendarDate: parseInt(moment(calendarCocktails[0].calendarDate.toString()).add(monthsTracked - 1, "month").format("YYYYMMDD")),
            scheduledCocktails: []
        }
        for(var u = 0; u < daysInCurrentMonth; u++){
            //saves recipe object at calendarRecipes[i].scheduledCocktails at index of the day-of-month minus 1
            newMonth.scheduledCocktails.push(createBlankCocktail());
        }

        calendarCocktails.push(newMonth);

        localStorage.setItem(localStorageCocktailCalendar, JSON.stringify(calendarCocktails));

        createNewDatesForCocktails();
    }
}

//for button
function saveRecipeToCalendar(monthIndex, dayMinusOne, _name, _ingredients, _healthLabels, _servings, _recipeUrl, _imageUrl){
    //calendarRecipes[monthIndex].scheduledRecipes[dayMinusOne].scheduleRecipe(_name, _ingredients, _healthLabels, _servings, _recipeUrl, _imageUrl);

    var cal = calendarRecipes[monthIndex].scheduledRecipes[dayMinusOne];
    console.log(cal.recipeOnThisDate);
    cal.recipeOnThisDate = true;
    cal.name = _name;
    cal.ingredients = _ingredients;
    cal.healthLabels = _healthLabels;
    cal.servings = _servings;
    cal.recipeUrl = _recipeUrl;
    cal.imageUrl = _imageUrl;

    //sets data to altered values
    calendarRecipes[monthIndex].scheduledRecipes[dayMinusOne] = cal;

    localStorage.setItem(localStorageRecipeCalendar, JSON.stringify(calendarRecipes));
}

//for button
function saveCocktailToCalendar(monthIndex, dayMinusOne, _drinkName, _ingrediantList, _drinkRecipe, _drinkThumbnailSrc){
    //calendarCocktails[monthIndex].scheduledCocktails[dayMinusOne].scheduleCocktail(_drinkName, _ingrediantList, _drinkRecipe, _drinkThumbnailSrc);
    
    var cal = calendarCocktails[monthIndex].scheduledCocktails[dayMinusOne];

    cal.cocktailOnThisDate = true;
    cal.drinkName = _drinkName;
    cal.ingrediantList = _ingrediantList;
    cal.drinkRecipe = _drinkRecipe;
    cal.drinkThumbnailSrc = _drinkThumbnailSrc;

    calendarCocktails[monthIndex].scheduledCocktails[dayMinusOne] = cal;
    
    localStorage.setItem(localStorageCocktailCalendar, JSON.stringify(calendarCocktails));
    console.log(calendarCocktails);
}

//creates cocktail data if none is found
if(loadCocktails != null){
    calendarCocktails = loadCocktails;
    //TODO compare dates to edit them
}
else
{
    for (var i = 0; i < monthsTracked; i++){
        var daysInCurrentMonth = moment().add(i, "months").daysInMonth();
        calendarCocktails.push({
            //saves the date it was added
            calendarDate: parseInt(moment().add(i, "months").startOf("month").format("YYYYMMDD")),
            //loop below adds recipe objects
            scheduledCocktails: []
        });
        for(var u = 0; u < daysInCurrentMonth; u++){
            //saves recipe object at calendarCocktails[i].scheduledCocktails at index of the day-of-month minus 1
            calendarCocktails[i].scheduledCocktails.push(createBlankCocktail());
        }
    }

    console.log(calendarCocktails);
    localStorage.setItem(localStorageCocktailCalendar, JSON.stringify(calendarCocktails));
}

//creates recipe data if none is found
if(loadRecipes != null){
    calendarRecipes = loadRecipes;
    //compares dates to edit them
    createNewDatesForRecipes();
}else{
    for (var i = 0; i < monthsTracked; i++){
        var daysInCurrentMonth = moment().add(i, "months").daysInMonth();
        calendarRecipes.push({
            //saves the date it was added
            calendarDate: parseInt(moment().add(i, "months").startOf("month").format("YYYYMMDD")),
            //loop below adds recipe objects
            scheduledRecipes: []
        });
        for(var u = 0; u < daysInCurrentMonth; u++){
            //saves recipe object at calendarRecipes[i].scheduledRecipes at index of the day-of-month minus 1
            calendarRecipes[i].scheduledRecipes.push(createBlankRecipe());
        }
    }

    localStorage.setItem(localStorageRecipeCalendar, JSON.stringify(calendarRecipes));
}