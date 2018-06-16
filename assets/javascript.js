$(document).ready(function () {
  //Global Variables and Arrays
  var lumber = {
    board: {
      dimension: ["1", "2", "3", "4", "6", "8", "10", "12", "16", "", "20", ""],
      type: ["Fir", "Oak", "Cdr", "Rdwd"]
    },
    plywood: {
      dimension: ["1", "2", "3", "4", "5", "6", "8", "", "/", ""],
      type: ["Pine", "Oak", "Rdwd", "Birch", "OSB", "MDF"]
    }
  };
  var counter = 0;
  var list = [];
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAVx25kRGgziJgC49KkZybS8Ho6jkvOVDo",
    authDomain: "project1-1528576226463.firebaseapp.com",
    databaseURL: "https://project1-1528576226463.firebaseio.com",
    projectId: "project1-1528576226463",
    storageBucket: "project1-1528576226463.appspot.com",
    messagingSenderId: "688467533743"
  };
  firebase.initializeApp(config);

  // //Stores text into firebase
  // var database = firebase.database();

  // $("body").on("click", "#add", function (event) {
  //   event.preventDefault();
  //   material = $("#product-input").val().trim();
  //   alert(material);
  //   database.ref().set({
  //     list: list
  //   });
  // })

  
  //Stores recurring JQuery to variable
  var buttonDiv = $("#buttons-div");
  //Creates buttons to enter dimensions of lumber, a home button, and a back button
  function getDimensionButtons() {
    var dimArray = lumber.board.dimension;
    for (var i = 0; i < dimArray.length; i++) {
      if (i === 9) {
        buttonDiv.append('<button type="button" class="white-text text-accent-4 green" id="buttons-id" value=' + dimArray[i] + '>' + dimArray[i] + '<i class="fa fa-home"></i></button>');
      }
      else if (i === 11) {
        buttonDiv.append('<button type="button" class="white-text text-accent-4 green" id="buttons-id" value=' + dimArray[i] + '>' + dimArray[i] + '<i class="fa fa-arrow-left"></i></button>');
      }
      else {
        buttonDiv.append('<button type="button" class="white-text text-accent-4 black" id="buttons-id" value=' + dimArray[i] + '>' + dimArray[i] + '</button>');
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
      buttonDiv.append('<button type="button" class="white-text text-accent-4 black" id="type-buttons-id" value=' + typeArray[i] + '>' + typeArray[i] + '</button>');
    }
  }
  //Creates a quantity field with + and - buttons
  function getQuantityButtons() {
    buttonDiv.empty();
    buttonDiv.append('<div class="row" id="qtySpacer"></div>');
    buttonDiv.append('<div class="row">')
    buttonDiv.append('<div class="col s4" id="qty-spacer-left"></div>')
    buttonDiv.append('<div class="col s4" id="qty-container"></div>')
    $("#qty-container").append('<a class="btn-floating btn-large waves-effect waves-light green"><i class="material-icons">+</i></a>');
    $("#qty-container").append('<br><a class="btn-floating btn-large waves-effect waves-light green"><i class="material-icons">-</i></a>');
    buttonDiv.append('<div class="col s4" id="qty-spacer-right"></div>')
  }

  //Clicking these buttons updates the display with dimensions, then calls the type buttons after three 
  //dimensions are entered
  $("body").on("click", "#buttons-id", function () {
    if (counter < 2) {
      var buttonValue = $(this).attr("value");
      dataInput.append(buttonValue + " x ");
      counter++;
    }
    else if (counter < 3) {
      var buttonValue = $(this).attr("value");
      dataInput.append(buttonValue + " ");
      counter++;
      getTypeButtons();
    }
  });

  //Clicking a 'type' button updates the display with lumber type, then calls the quantity button 
  $("body").on("click", "#type-buttons-id", function () {
    if (counter < 4) {
      var buttonValue = $(this).attr("value");
      dataInput.append(buttonValue + " = ");
      counter++;
      getQuantityButtons();
    }
  });

  //Clicking the 'add' button updates the list array, updates Firebase database
  $("body").on("click", "#add-button-id", function () {
    if (counter < 5) {
      var buttonValue = $(this).attr("value");
      dataInput.append(buttonValue + " = ");
      counter++;
    }
  });

  //Main Process
  getDimensionButtons();
});