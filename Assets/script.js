$(document).ready(function(){

// calling calendar id from calendar.html
    var calendar = $('#calendar');
    var daysOfWeek= ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    var currentDay = 0;
    var hasReachedDay = false;
    var startOfMonth =moment().startOf('month').format('dddd');
    var todayCurrentMonth = parseInt(moment().format('YYYYMMDD'));


// Giving current month
    const now = moment().format('MMMM YYYY');
    $(".month").append(now);
// creating the days of week for calendar
    for (i = 0; i < daysOfWeek.length; i++) {
        $('.week').append(daysOfWeek[i] + " ") ;
        // $('.week').append(daysOfWeek[1] + " ") ;
        // $('.week').append(daysOfWeek[2] + " ") ;
        // $('.week').append(daysOfWeek[3] + " ") ;
        // $('.week').append(daysOfWeek[4] + " ") ;
        // $('.week').append(daysOfWeek[5] + " ") ;
        // $('.week').append(daysOfWeek[6] + " ") ;
    }
    // creating days for current month
    for (day = 1; day <= moment().daysInMonth(); day++) {


        //$().addClass('row');
        var newDay = $("<div>").addClass("day");
        newDay.attr("data-toggle", "modal").attr("data-target", "#exampleModalLong");

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



        }
// Dynamically adding borders to the Calendar Days
        $('.day').css("border", "black 1px solid") 


    }
    // Getting styling for Past, Present, Future


// Click event for each individual Day
        $(document).on("click", ".day", function(){
            console.log($(this).text())



        })

})


// create an empty modal for on click event 