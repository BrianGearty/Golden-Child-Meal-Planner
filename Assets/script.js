$(document).ready(function(){

// calling calendar id from calendar.html
    var calendar = $('#calendar');
    var calendarMonthTwo = $("#calendar-month-2");
    var calendarMonthThree = $("#calendar-month-3")
    var daysOfWeek= ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    var currentDay = 0;
    var hasReachedDay = false;
    var startOfMonth =moment().startOf('month').format('dddd');
    var todayCurrentMonth = parseInt(moment().format('YYYYMMDD'));

    //modal elements that display the info
    const recipeModal = $("#food-modal");
    const cocktailModal = $("#drink-modal");

    //load info if there
    var loadRecipes = JSON.parse(localStorage.getItem(localStorageRecipeCalendar));
    var loadCocktails = JSON.parse(localStorage.getItem(localStorageCocktailCalendar));

    var startNextMonth = moment().add(1, "month").startOf('month').format('dddd');
    var currentDayNextMonth = 0;
    var hasReachedDayNextMonth = false;

    const nextMonth = moment().add(1, "month").format('MMMM YYYY');
    $("#month-2").append(nextMonth);
    // creating the days of week for calendar
    for (i = 0; i < daysOfWeek.length; i++) {
        $('#week-month-2').append(daysOfWeek[i] + " ") ;
    
    }
    // creating days for current month
    for (var day = 1; day <= moment().add(1, "month").daysInMonth(); day++) {
        //$().addClass('row');
        var newDay = $("<div>").addClass("day");
        $(newDay).attr("month", 1).attr("day", day - 1);

        // Adding Unordered List to each day
        var unorderedList= $('ul').addClass("recipe-list");
        $(newDay).append(unorderedList);

        // checking what day start of month is on and appending it properly to grid
        if (startNextMonth != daysOfWeek[currentDayNextMonth] && hasReachedDayNextMonth == false) {
            day--;
            $(newDay).addClass("past");
            $(calendarMonthTwo).append(newDay);
            currentDayNextMonth++;
        }else {
            $(newDay).text(day);
            $(calendarMonthTwo).append(newDay);
            hasReachedDayNextMonth = true;

            $(newDay).addClass('future').removeClass('past present');

            //check if saved recipe data
            if(loadRecipes != null){
                var recipeAtThisDate = loadRecipes[$(newDay).attr("month")].scheduledRecipes[$(newDay).attr("day")];

                if(recipeAtThisDate.recipeOnThisDate){
                    //only activates modal if data is present
                    $(newDay).attr("data-toggle", "modal").attr("data-target", "#exampleModalLong");

                    var recipeItem = $("<li>").text("Recipe Scheduled").attr("id", "recipe" + 1 + (day - 1));

                    //add marker to recipe
                    $(newDay).append(recipeItem);
                }
            }

            //check if saved cocktail
            if(loadCocktails != null){
                var cocktailAtThisDate = loadCocktails[$(newDay).attr("month")].scheduledCocktails[$(newDay).attr("day")];

                if(cocktailAtThisDate.cocktailOnThisDate){
                    $(newDay).attr("data-toggle", "modal").attr("data-target", "#exampleModalLong");

                    var cocktailItem = $("<li>").text("Cocktail Scheduled").attr("id", "cocktail" + 1 + (day - 1));

                    $(newDay).append(cocktailItem);
                }
            }
        }
    }

    var startNextNextMonth = moment().add(2, "month").startOf('month').format('dddd');
    var currentDayNextNextMonth = 0;
    var hasReachedDayNextNextMonth = false;

    const nextNextMonth = moment().add(2, "month").format('MMMM YYYY');
    $("#month-3").append(nextNextMonth);
    // creating the days of week for calendar
    for (i = 0; i < daysOfWeek.length; i++) {
        $('#week-month-3').append(daysOfWeek[i] + " ") ;
    }
    // creating days for current month
    for (var day = 1; day <= moment().add(2, "month").daysInMonth(); day++) {
        //$().addClass('row');
        var newDay = $("<div>").addClass("day");
        $(newDay).attr("month", 2).attr("day", day - 1);

        // Adding Unordered List to each day
        var unorderedList= $('ul').addClass("recipe-list");
        $(newDay).append(unorderedList);

        // checking what day start of month is on and appending it properly to grid
        if (startNextNextMonth != daysOfWeek[currentDayNextNextMonth] && hasReachedDayNextNextMonth == false) {
            day--;
            $(newDay).addClass("past");
            $(calendarMonthThree).append(newDay);
            currentDayNextNextMonth++;
        }else {
            $(newDay).text(day);
            $(calendarMonthThree).append(newDay);
            hasReachedDayNextNextMonth = true;

            $(newDay).addClass('future').removeClass('past present');

            //check if saved recipe data
            if(loadRecipes != null){
                var recipeAtThisDate = loadRecipes[$(newDay).attr("month")].scheduledRecipes[$(newDay).attr("day")];

                if(recipeAtThisDate.recipeOnThisDate){
                    //only activates modal if data is present
                    $(newDay).attr("data-toggle", "modal").attr("data-target", "#exampleModalLong");

                    var recipeItem = $("<li>").text("Recipe Scheduled").attr("id", "recipe" + 2 + (day - 1));

                    //add marker to recipe
                    $(newDay).append(recipeItem);
                }
            }

            //check if saved cocktail
            if(loadCocktails != null){
                var cocktailAtThisDate = loadCocktails[$(newDay).attr("month")].scheduledCocktails[$(newDay).attr("day")];

                if(cocktailAtThisDate.cocktailOnThisDate){
                    $(newDay).attr("data-toggle", "modal").attr("data-target", "#exampleModalLong");

                    var cocktailItem = $("<li>").text("Cocktail Scheduled").attr("id", "cocktail" + 2 + (day - 1));

                    $(newDay).append(cocktailItem);
                }
            }
        }
    }

// Giving current month
    const now = moment().format('MMMM YYYY');
    const nowDay = moment().format('MMMM DD YYYY');
    $("#month").append(now);
    $('.modal-title').append(nowDay);
    
// creating the days of week for calendar
    for (i = 0; i < daysOfWeek.length; i++) {
        $('#week').append(daysOfWeek[i] + " ") ;
    }
    // creating days for current month
    for (var day = 1; day <= moment().daysInMonth(); day++) {
        //$().addClass('row');
        var newDay = $("<div>").addClass("day");
        $(newDay).attr("month", 0).attr("day", day - 1);

        // Adding Unordered List to each day
        var unorderedList= $('ul').addClass("recipe-list");
        $(newDay).append(unorderedList);

        // checking what day start of month is on and appending it properly to grid
        if (startOfMonth != daysOfWeek[currentDay] && hasReachedDay == false) {
            day--;
            $(newDay).addClass("past");
            $(calendar).append(newDay);
            currentDay++;
        } else {
            $(newDay).text(day);
            $(calendar).append(newDay);
            hasReachedDay = true;

            var dateOnCalendar = parseInt(moment().date(day).format('YYYYMMDD'));

            if(dateOnCalendar < todayCurrentMonth){
                $(newDay).addClass('past').removeClass("present future");
            }
            else if (dateOnCalendar == todayCurrentMonth){
                $(newDay).addClass('present').removeClass("past future");
            }
            else
            {
                $(newDay).addClass('future').removeClass('past present');
            }

            //check if saved recipe data
            if(loadRecipes != null){
                var recipeAtThisDate = loadRecipes[$(newDay).attr("month")].scheduledRecipes[$(newDay).attr("day")];

                if(recipeAtThisDate.recipeOnThisDate){
                    //only activates modal if data is present
                    $(newDay).attr("data-toggle", "modal").attr("data-target", "#exampleModalLong");

                    var recipeItem = $("<li>").text("Recipe Scheduled").attr("id", "recipe" + 0 + (day - 1));

                    //add marker to recipe
                    $(newDay).append(recipeItem);
                }
            }

            //check if saved cocktail
            if(loadCocktails != null){
                var cocktailAtThisDate = loadCocktails[$(newDay).attr("month")].scheduledCocktails[$(newDay).attr("day")];

                if(cocktailAtThisDate.cocktailOnThisDate){
                    $(newDay).attr("data-toggle", "modal").attr("data-target", "#exampleModalLong");

                    var cocktailItem = $("<li>").text("Cocktail Scheduled").attr("id", "cocktail" + 0 + (day - 1));

                    $(newDay).append(cocktailItem);
                }
            }
        }
// Dynamically adding borders to the Calendar Days
        $('.day').css("border", "black 1px solid") 


    }
    // Getting styling for Past, Present, Future


// Click event for each individual Day
        $(document).on("click", ".day", function(){
            $(recipeModal).empty();
            $(cocktailModal).empty();

            if(loadRecipes != null){
                var recipeAtThisDate = loadRecipes[$(this).attr("month")].scheduledRecipes[$(this).attr("day")]

                if(recipeAtThisDate.recipeOnThisDate){
                    //holds the card
                    var recipeHolder = $("<div>").addClass("recipe-search-card-holder");
                    var nameDisplay = $("<h2>").addClass("recipe-search-card-name").text(recipeAtThisDate.name);
                    //put ingredients into an ordered list
                    var ingredientsHolder = $("<ol>").addClass("recipe-search-card-ingredients-ol");
                    $.each(recipeAtThisDate.ingredients, function(i, index){
                        var currentIngredient = $("<li>").text(index);
                        $(ingredientsHolder).append(currentIngredient);
                    });
    
                    var healthHolder = $("<ul>").addClass("recipe-search-card-health-ul");
                    var checkForHealthLabels = false;
                    //check to see if there's any health labels
                    if(recipeAtThisDate.healthLabels.length > 0){
                        checkForHealthLabels = true;
                        var healthTitle = $("<div>").addClass("recipe-search-card-health-ul-title").text("Health Label(s):")
                        $(healthHolder).append(healthTitle);
                        $.each(recipeAtThisDate.healthLabels, function(i, index){
                            var currentHealth = $("<li>").text(index);
                            $(healthHolder).append(currentHealth);
                        });
                    }
    
                    var servingDisplay = $("<div>").addClass("recipe-search-card-servings").text("Serves " + recipeAtThisDate.servings).attr("data-val", recipeAtThisDate.servings);
    
                    var recipeButton = $("<a>").addClass("recipe-search-card-button").text("Click To Get Recipe")
                        .attr({"href": recipeAtThisDate.recipeUrl, "target": "_blank"});
    
                    var recipeImage = $("<img>").addClass("recipe-search-card-image").attr("src", recipeAtThisDate.imageUrl);

                    //cancel button
                    var cancelRecipeButton = $("<button>").addClass("btn btn-danger").text("Cancel Recipe").attr({
                        month: $(this).attr("month"),
                        day: $(this).attr("day")
                    }).click(function(){
                        cancelRecipe($(this).attr("month"), $(this).attr("day"));
                        $("#recipe" + $(this).attr("month") + ($(this).attr("day"))).remove();
                        $(recipeModal).empty();
                    });
    
                    //check if there are any health labels
                    if(checkForHealthLabels){
                        $(recipeHolder).append(nameDisplay, recipeImage, ingredientsHolder, healthHolder, servingDisplay, recipeButton, "<br>", addFavoritesButtonToCardRecipe(recipeAtThisDate.name), cancelRecipeButton);
                    }
                    else
                    {
                        $(recipeHolder).append(nameDisplay, recipeImage, ingredientsHolder, servingDisplay, recipeButton, "<br>", addFavoritesButtonToCardRecipe(recipeAtThisDate.name), cancelRecipeButton);
                    }
    
                    $(recipeModal).empty();
                    $(recipeModal).append(recipeHolder);

                    console.log(recipeAtThisDate);
                }
            }else{
                //empties it if no saved data is found
                $(recipeModal).empty();
            }

            if(loadCocktails != null){
                var cocktailAtThisDate = loadCocktails[$(this).attr("month")].scheduledCocktails[$(this).attr("day")];

                if(cocktailAtThisDate.cocktailOnThisDate){
                    var cocktailHolder = $("<div>").addClass("cocktail-search-card-holder");
                    var nameDisplay = $("<h2>").addClass("cocktail-search-card-name").text(cocktailAtThisDate.drinkName);
                    //put ingredients into an ordered list
                    var ingredientsHolder = $("<ol>").addClass("cocktail-search-card-ingredients-ol");
                    $.each(cocktailAtThisDate.ingrediantList, function(i, index){
                        var currentIngredient = $("<li>").text(index);
                        $(ingredientsHolder).append(currentIngredient);
                    });
    
                    var recipeHolder = $("<div>").addClass("cocktail-search-card-recipe").text(cocktailAtThisDate.drinkRecipe);
    
                    var drinkImage = $("<img>").addClass("cocktail-search-card-image").attr("src", cocktailAtThisDate.drinkThumbnailSrc);
    
                    //cancel button
                    var cancelRecipeButton = $("<button>").addClass("btn btn-danger").text("Cancel Cocktail").attr({
                        month: $(this).attr("month"),
                        day: $(this).attr("day")
                    }).click(function(){
                        cancelCocktail($(this).attr("month"), $(this).attr("day"));
                        $("#cocktail" + $(this).attr("month") + ($(this).attr("day"))).remove();
                        $(cocktailModal).empty();
                    });
                    
                    $(cocktailHolder).append(nameDisplay, drinkImage, ingredientsHolder, recipeHolder);
    
                    //add favorites bar
                    $(cocktailHolder).append(addFavoritesButtonToCardCocktail(cocktailAtThisDate.drinkName), cancelRecipeButton);
    
                    $(cocktailModal).empty();
                    $(cocktailModal).append(cocktailHolder);
                }
            }
            else{
                $(cocktailModal).empty();
            }
        })

})