# Golden Child Meal Planner

The GCMP is an application that allows the user to search for recipes for food and cocktails, then save those recipes to a dynamically updating calendar.
This allows you to plan out your meals ahead of time, to help manage your time bettter.
It also allows you to save your favorite recipes to a dedicated Favorites page independant of the calendar.
Perfect for busy mothers and cooking enthusiests.

*(Note: uses Local Storage to save info)*
(*Note: the API that searches the recipes has a limit and how many searches can be done per minute. If it's not working, just wait a bit)*

[Click Here to Visit the Website](https://briangearty.github.io/Golden-Child-Meal-Planner/)

When you first arrive at the site, you'll be greeted with a landing page that covers the features and benefits of the GCMP
![Landing Page Info](./RM_Srceenshots/1landing-cards.png)

The GCMP consists of 4 web pages: The Home Page, Search, Calendar, and Favorites.
Use the *Navbar at the Top* to travel between them.
![Nav Bar](./RM_Srceenshots/2nav-bar.png)

## Recipe Search Page

First, you'll want to visit the *Search* page, to look up some recipes
![Search Recipes Page](./RM_Srceenshots/3search.png)

### Search Food

To look up recipes for food, use the input field on the *Left* side of the screen
![Search Food Input Field](./RM_Srceenshots/4search-recipes.png)

Your main search parameter goes in the text-input field at the top
![Food Search Bar](./RM_Srceenshots/5recipe-name.png)

You then have the *Option* to select a dietary restriction from the radio buttons
![Diet Type Buttons](./RM_Srceenshots/6recipe-diet.png)

As well as refining your search by a scpecific health/allergy restriction
![Health Buttons](./RM_Srceenshots/7recipe-health.png)

Once you've entered the information and clicked the *Search* button,
The search results will be displayed in an area beneath the input field
![Food Recipe Display](./RM_Srceenshots/8recipe-card.png)

Unfortunately, while the list of ingredients can be directly displayed, the actual recipe cannot
(This is limitation of the API, not of this application)
To get the recipe, you need to click the *Click To Get Recipe* button
![Get Recipe Button](./RM_Srceenshots/9get-recipe.png)
Which will take you to the website where the full recipe is hosted

Once you've decided on a recipe, you can schedlue it using the *Schedule Buttons* located under the *Click To Get Recipe* button
The fist button sets the *Month*, the second buttons sets the *Day*, and the third button *Adds the Recipe to the Calendar*
![Schedule Buttons](./RM_Srceenshots/10recipe-schedule.png)

If you decide you want to save a recipe in case you want to make it again,
just click on the *Favorite Heart* to save it to your favorites.
![Favorite Button](./RM_Srceenshots/11recipe-fav.png)

Once favorited, the heart will change from Empty to Red
![Full Heart](./RM_Srceenshots/12recipe-faved.png)

### Search Drink
#### Mostly seacrhes alcoholic drinks, but not all of them are alcoholic

For Cocktail recipes, use the input field on the *Right* side of the screen.
![Search Drink Input Field](./RM_Srceenshots/13cocktail-search.png)

This one's design is simpler than the Food one. There's 3 ways to search;
1. Search a cocktail by *Name*
2. Search a cocktail by *An Ingredient* (Returns 5)
3. Get a cocktail *At Random*
*(Note: Each of the search methods has a dedicated search button, and ignores the text fields of the others)*

Cocktails are displayed under the Input Field, and can be *Scheduled and Favorited* in the same way as the Food Recipes
![Cocktail Recipe Display](./RM_Srceenshots/14cocktail-result.png)

## Favorites Page

Touching on this first because it's quick and simple.

Any food and drink recipes you chose to *Favorite* are displayed here
![Favorites](./RM_Srceenshots/15favs.png)

The *Schedule Buttons* work the same as on the *Search* page,
and the *Remove From Favorites* button will delete the recipe from Local Storage.
![Schedule & Remove Recipe Buttons](./RM_Srceenshots/16favs-buttons.png)

## Calendar Page

The calendar at the top of the page will display the current month.
Past dates are *Grey*, future dates are *Green*, and the current date is *Yellow*
![Current Month Calendar](./RM_Srceenshots/17-calendar-current.png)

Scrolling down will reveal 2 more calendars, with the *Next Two Months*
![Future Month Calendar](./RM_Srceenshots/18-calendar-future.png)

Clicking on a date where you've scheduled a Food and/or Drink recipe opens a pop-up with the info of that/those recipe(s)
![Scheduled Recipes Display](./RM_Srceenshots/19cal-modal.png)

If you decide you don't want to make these recipes,
then can be individually cancelled using their respective buttons.
![Cancel Food Recipe](./RM_Srceenshots/20-cancel-recipe.png)
![Cancel Cocktail Recipe](./RM_Srceenshots/21-cancel-cocktail.png)