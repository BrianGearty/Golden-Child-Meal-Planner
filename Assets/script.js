$(document).ready(function(){

// calling calendar id from calendar.html
    var calendar = $('#calendar');
    var daysOfWeek= ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    var currentDay = 0;
    var hasReachedDay = false;
    var startOfMonth =moment().startOf('month').format('dddd');

// Giving current month
    const now = moment().format('MMMM YYYY');
    $(".month").append(now);
// creating the days of week for calendar
        $('.week').append(daysOfWeek[0] + " ") ;
        $('.week').append(daysOfWeek[1] + " ") ;
        $('.week').append(daysOfWeek[2] + " ") ;
        $('.week').append(daysOfWeek[3] + " ") ;
        $('.week').append(daysOfWeek[4] + " ") ;
        $('.week').append(daysOfWeek[5] + " ") ;
        $('.week').append(daysOfWeek[6] + " ") ;
    
    // creating days for current month
    for (day = 1; day <= moment().daysInMonth(); day++) {
        
        $().addClass('row');
        
        // checking what day start of month is on and appending it properly to grid
        if (startOfMonth != daysOfWeek[currentDay] && hasReachedDay == false) {
            day--;
            $(calendar).append(`<div class="day"></div>`)
            currentDay++;
        } else {
            $(calendar).append(`<div class="day">${day}</div>`)
            hasReachedDay = true;
        }

        $('.day').css("border", "black 1px solid") 
        
    }
    //
    var today = moment().format('dddd');
    
    for (var i = 0; i < daysOfWeek.length; i++) {

        if (today <= daysOfWeek[i] ) {
            $(daysOfWeek).addClass('past');
            $('.past').css("background-color", "grey");
            // console.log('.past');

        } else if (today == daysOfWeek[i]) {
            $(today).addClass('present');
            $('.present').css("background-color", "red");
            console.log('.present')

        } else { 
            $(daysOfWeek).addClass('future');
            $('.future').css("background-color", "green")
            
        }
        }
        



        $(document).on("click", ".day", function(){
            console.log($(this).text())
        })

 































})