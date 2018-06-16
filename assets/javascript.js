$(document).ready(function () {
  //Global Variables and Arrays
  //===============================================================================================================
  var lumber = {
    board: {
      dimension: ["1", "2", "3", "4", "6", "8", "10", "12", "16", "", "20", ""],
      type: ["Fir", "Oak", "Cdr", "Rdwd", "Trtd"]
    },
    plywood: {
      dimension: ["1", "2", "3", "4", "5", "6", "8", "", "/", ""],
      type: ["Pine", "Oak", "Rdwd", "Birch", "OSB", "MDF"]
    }
  };
  var counter = 0;
  var listItem = "";
  var list = ["2x4x8 Oak = 12", "2x6x12 Pine = 10"];
  var latitude = 0;
  var longitude = 0;

  // Initialize Firebase
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

  //Functions
  //==============================================================================================================

  //Stores recurring JQuery to variable
  var buttonDiv = $("#buttons-div");

  //Creates buttons to enter dimensions of lumber, a home button, and a back button
  function getDimensionButtons() {
    var dimArray = lumber.board.dimension;
    for (var i = 0; i < dimArray.length; i++) {
      if (i === 9) {
        buttonDiv.append('<button type="button" class="white-text text-accent-4 green dimension-buttons" value=' + dimArray[i] + '>' + dimArray[i] + '<i class="fa fa-home"></i></button>');
      }
      else if (i === 11) {
        buttonDiv.append('<button type="button" class="white-text text-accent-4 green dimension-buttons" value=' + dimArray[i] + '>' + dimArray[i] + '<i class="fa fa-arrow-left"></i></button>');
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
    buttonDiv.append('<div class="row spacer"></div>');
    buttonDiv.append('<div class="row spacer" id="qty-row"></div>');

    var spacerDiv = $("#qty-row");

    spacerDiv.append('<div class="col s6" id="qty-left"></div>');
    var quantityDiv = $("#qty-left");
    quantityDiv.html('<form id="qty-input"><input type="text" placeholder="Qty></form>');


    spacerDiv.append('<div class="col s6" id="qty-right"></div>');

    var containerDiv = $("#qty-right");

    containerDiv.append('<button type="button" class="white-text text-accent-4 green type-buttons" id="plus">+</button>');
    containerDiv.append('<button type="button" class="white-text text-accent-4 green type-buttons" id="minus">-</button>');
  }
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
  function getMap() {
    buttonDiv.empty();
    buttonDiv.append('<div id="map" style="width: 100%; height: 600px;"></div>');
    console.log(latitude);
    console.log(longitude);

      L.mapquest.key = 'lYrP4vF3Uk5zgTiGGuEzQGwGIVDGuy24';

      var map = L.mapquest.map('map', {

        center: [latitude, longitude],
        layers: L.mapquest.tileLayer('map'),
        zoom: 12
      });

      map.addControl(L.mapquest.control());
    
  }


  //Click Events
  //==============================================================================================================

  //Clicking these buttons updates the display with dimensions, then calls the type buttons after three 
  //dimensions are entered
  $("body").on("click", ".dimension-buttons", function () {
    if (counter < 2) {
      var buttonValue = $(this).attr("value");
      dataInput.append(buttonValue + " x ");
      listItem = listItem + buttonValue + " x ";
      counter++;
    }
    else if (counter < 3) {
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
    if (counter < 4) {
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
    list.push(listItem);
    database.ref().set({
      list: list
    });

  });

  //Firebase.database() trigger stored to var database
  var database = firebase.database();

  //Clicking the 'list' button retreives firebase.database list and displays as a list
  $("body").on("click", "#list-btn", function (event) {

  })




  //Main Process
  //==============================================================================================================
  geoFindMe();

  // getDimensionButtons();
});