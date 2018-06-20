$(document).ready(function () {
  //GLOBAL VARIABLES AND ARRAYS ***********************************************************************************
  //===============================================================================================================
  var lumber = {
    board: {
      dimension: ["1", "2", "3", "4", "6", "8", "10", "12", "16", "home", "20", "del"],
      type: ["Fir", "Pine", "Oak", "Cedar", "Rdwd", "Trtd"]
    },
    plywood: {
      dimension: ["1", "2", "3", "4", "5", "8", "home", "&#47", "del"],
      type: ["Pine", "Oak", "Rdwd", "Birch", "OSB", "MDF"]
    },
    quantity: ["1", "5", "10", "100"]
  };
  var categoryArray = ["Lumber", "Plumbing", "Electrical", "Hardware"];
  var lumberSubCategoryArray = ["Board", "Plywood"];
  var category = "";
  var subCategory;
  var dimArray;
  var counter = 0;
  var listItem = "";
  var list = [];
  var qty = 1;
  var qtyArray
  var latitude = 0;
  var longitude = 0;

  // Initialize Firebase ******************************************************************************************
  //===============================================================================================================
  var config = {
    apiKey: "AIzaSyAVx25kRGgziJgC49KkZybS8Ho6jkvOVDo",
    authDomain: "project1-1528576226463.firebaseapp.com",
    databaseURL: "https://project1-1528576226463.firebaseio.com",
    projectId: "project1-1528576226463",
    storageBucket: "project1-1528576226463.appspot.com",
    messagingSenderId: "688467533743"
  };
  firebase.initializeApp(config);

  //FUNCTIONS ****************************************************************************************************
  //==============================================================================================================

  //Stores recurring JQuery to variable
  var buttonDiv = $("#buttons-div");

  //Upon loading page, a button creates the lumber category for building a list
  function getCategoryButton() {

    buttonDiv.append('<h1 id="category-choice">Pick a category...</h1>');
    for (var i = 0; i < categoryArray.length; i++) {
      buttonDiv.append('<button type="button" class="white-text text-accent-4 black category-buttons" value=' + categoryArray[i] + '>' + categoryArray[i] + '</button>');
    }
  }
  //Creates buttons to select sub-category of selected category
  function getSubCategoryButtons(category) {
    buttonDiv.empty();
    buttonDiv.append('<h1 id="category-choice">What kind of ' + category + ' ?</h1>');
    for (var i = 0; i < subCategory.length; i++) {
      buttonDiv.append('<button type="button" class="white-text text-accent-4 black sub-category-buttons" value=' + subCategory[i] + '>' + subCategory[i] + '</button>')
    }
  }

  //Stores recurring JQuery to variable
  var displayField = $("#display-field");

  //Creates buttons to enter dimensions of lumber, a home button, and a back button
  function getDimensionButtons() {
    displayField.show();
    buttonDiv.empty();
    for (var i = 0; i < dimArray.length; i++) {
      if (dimArray[i] === "home") {
        buttonDiv.append('<button type="button" class="white-text text-accent-4 green dimension-buttons"><i class="fa fa-home"></i></button>');
      }
      else if (dimArray[i] === "del") {
        buttonDiv.append('<button type="button" class="white-text text-accent-4 green dimension-buttons"><i class="fa fa-arrow-left"></i></button>');
      }
      else {
        buttonDiv.append('<button type="button" class="white-text text-accent-4 black dimension-buttons" value=' + dimArray[i] + '>' + dimArray[i] + '</button>');
      }
    }
  }
  //Stores recurring JQuery to variable
  var dataInput = $("#data-input");

  //Creates buttons to enter wood type
  function getTypeButtons() {
    buttonDiv.empty();
    var typeArray = lumber.board.type;
    for (var i = 0; i < typeArray.length; i++) {
      buttonDiv.append('<button type="button" class="white-text text-accent-4 black type-buttons" value=' + typeArray[i] + '>' + typeArray[i] + '</button>');
    }
  }
  //Creates a quantity field with + and - buttons
  function getQuantityButtons() {
    buttonDiv.empty();
    buttonDiv.append('<h1 id="category-choice">How many? <span id="qty-input">' + qty + '</span></h1>');
    qtyArray = lumber.quantity;
    for (var i = 0; i < qtyArray.length; i++) {
      buttonDiv.append('<button type="button" class="white-text text-accent-4 black qty-buttons" value=' + qtyArray[i] + '>' + qtyArray[i] + '</button>');
    }
    buttonDiv.append('<button type="button" class="white-text text-accent-4 green category-buttons">Add</button>') 
  }

  //Determines geo coordinates of current location
  function geoFindMe() {
    var output = document.getElementById("out");

    if (!navigator.geolocation) {
      output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
      return;
    }

    function success(position) {
      console.log(position)
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      getMap();
    }

    navigator.geolocation.getCurrentPosition(success);

  }

  //Calls MapQuest API and displays a map of current location, calls weather function
  function getMap() {
    displayField.hide();
    buttonDiv.empty();
    buttonDiv.append('<div class="yellow accent-4" id="map" style="width: 100%; height: 600px;"></div>');
    console.log(latitude);
    console.log(longitude);

    L.mapquest.key = 'lYrP4vF3Uk5zgTiGGuEzQGwGIVDGuy24';

    var map = L.mapquest.map('map', {

      center: [latitude, longitude],
      layers: L.mapquest.tileLayer('map'),
      zoom: 12
    });

    map.addControl(L.mapquest.control());
    getWeather();
  }

  //AJAX call to OpenWeather API, displays current temp and 5-day forecast
  function getWeather() {
    var key = "3c552e669646dac238724b88757b323c"
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=" + key;
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        console.log(queryURL);
        console.log(response);

        // Transfer content to HTML
        var icon = ("<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='Icon depicting current weather.'>");
        $(buttonDiv).append("<h1>Current Temp: " + response.main.temp + icon + "</h1>");

        //5-day forecast
        var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=" + key;
        $.ajax({
          url: queryURL2,
          method: "GET"
        })
          .then(function (response) {
            console.log(queryURL2);
            console.log(response);

            // Transfer content to HTML
            var icon = ("<img src='http://openweathermap.org/img/w/" + response.list[0].weather.icon + ".png' alt='Icon depicting current weather.'>");
            $(buttonDiv).append("<h1>5-Day Forecast</h1>");
            $(buttonDiv).append("<h1>" + response.list[0].main.temp + icon + "</h1>");

          });
      });
  }

  //CLICK EVENTS *************************************************************************************************
  //==============================================================================================================

  //Clicking a category button displays the proper subcategory buttons
  $("body").on("click", ".category-buttons", function () {
    category = $(this).attr("value").toLowerCase();
    if (category === "lumber") {
      subCategory = lumberSubCategoryArray;
    }
    getSubCategoryButtons(category);
  })
  $("body").on("click", ".sub-category-buttons", function () {
    pickedSubCategory = $(this).attr("value").toLowerCase();
    if (pickedSubCategory === "board") {
      dimArray = lumber.board.dimension;
    }
    else if (pickedSubCategory === "plywood") {
      dimArray = lumber.plywood.dimension;
    }
    getDimensionButtons();
  })
  //Clicking these buttons updates the display with dimensions, then calls the type buttons after three 
  //dimensions are entered
  $("body").on("click", ".dimension-buttons", function () {
    if (counter < 2) {
      var buttonValue = $(this).attr("value");
      dataInput.append(buttonValue + " x ");
      listItem = listItem + buttonValue + " x ";
      counter++;
    }
    else if (counter < 4) {
      var buttonValue = $(this).attr("value");
      dataInput.append(buttonValue + " ");
      listItem = listItem + buttonValue + " ";
      counter++;
      getTypeButtons();
    }
    console.log(listItem);
  });

  //Clicking a 'type' button updates the display with lumber type, then calls the quantity button 
  $("body").on("click", ".type-buttons", function () {
    if (counter < 5) {
      var buttonValue = $(this).attr("value");
      dataInput.append(buttonValue + " = ");
      listItem = listItem + buttonValue + " = ";
      counter++;
      getQuantityButtons();
    }
    console.log(listItem);
  });

  //Clicking the 'add' button updates the list array, updates Firebase database
  $("body").on("click", "#add-button-id", function (event) {
    event.preventDefault();
    listItem = listItem + qty;
    list.push(listItem);
    database.ref().set({
      list: list
    });

  });

  //Clicking the 'location' button call functions to display map and weather data
  $("#location-btn").on("click", function () {
    geoFindMe();
  })
  //Firebase.database() trigger stored to var database
  var database = firebase.database();


  //Clicking the 'list' button retreives firebase.database list and displays as a list
  $("body").on("click", "#list-btn", function (event) {

  })



  //MAIN PROCESS *************************************************************************************************
  //==============================================================================================================
  displayField.hide();
  getCategoryButton();

});