const apiKey = "762f0ea87e686d609160c3fd1d23050c";
const appId = "116c2f71";

var urlPath = "https://api.edamam.com/search?app_id=" + appId + "&app_key=" + apiKey;

//main query parameter, from search bar
var queryTerm = "chicken";

//cooking time parameters
var minTime = 0;
var maxTime = 0;

//balanced, high-protein, low-fat,  low-carb
var dietType = "";

//alcohol-free, peanut-free, sugar-conscious, tree-nut-free, vegan, vegetarian
var allergyAndHealth = "";

//the fucntion that will make the call
//check to make sure the main query is set
if(queryTerm){
    //adds the query to the API url
    urlPath += "&q=" + queryTerm;

    //see if min OR max cook time parameter has been set
    if(minTime > 0 || maxTime > 0)
    {
        //checks if min AND max given, AND min is less than max
        if(minTime > 0 && maxTime > 0 && minTime < maxTime)
        {
            urlPath += "&time=" + minTime + "-" + maxTime;
        }
        //if only min given. Checking this second means if min was greater than max, max will be ignored
        else if(minTime > 0)
        {
            urlPath += "&time=" + minTime + "%2B";
        }
        //if only max is given
        else if(maxTime > 0){
            urlPath += "&time=" + maxTime;
        }
    }
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
        console.log(response);
    });
}