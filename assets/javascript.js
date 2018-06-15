$(document).ready(function () {
  var lumber = {
    dimension: ["1", "2", "3", "4", "6", "8", "10", "12", "16", "Bk", "20", "Dl"],
    type: ["Pine", "Oak", "Rdwd", "Trtd"]
  };
  dimensionCounter = 0;
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

  //Stores text into firebase
  // var database = firebase.database();

  // var material = "";
  // var dimension = "";
  // var type = "";
  // var qty = 0;



  // material = "lumber";
  // dimension = "2x4x8";
  // type = "pine";
  // qty = 12;

  // $("body").on("click", "button", function (event) {
  //   event.preventDefault();
  //   material = $("#product-input").val().trim();
  //   alert(material);
  //   database.ref().set({
  //     material: material
  //   });
  // })
  function getDimensionButtons() {
    for (var i = 0; i < lumber.dimension.length; i++) {
      if (i === 9) {
        $("#buttons-div").append('<button type="button" class="white-text text-accent-4 green" id="buttons-id" value=' + lumber.dimension[i] + '>' + lumber.dimension[i] + '</button>');
      }
      else if (i === 11) {
        $("#buttons-div").append('<button type="button" class="white-text text-accent-4 green" id="buttons-id" value=' + lumber.dimension[i] + '>' + lumber.dimension[i] + '</button>');
      }
      else {
        $("#buttons-div").append('<button type="button" class="white-text text-accent-4 black" id="buttons-id" value=' + lumber.dimension[i] + '>' + lumber.dimension[i] + '</button>');
      }
    }
  }
  function getTypeButtons() {
    $("#buttons-div").empty();
    for (var i = 0; i < lumber.type.length; i++) {
      $("#buttons-div").append('<button type="button" class="white-text text-accent-4 black" id="type-buttons-id" value=' + lumber.type[i] + '>' + lumber.type[i] + '</button>');
    }
  }
  function getQuantityButtons() {
    $("#buttons-div").empty();
    $("#buttons-div").append();
  }


  $("body").on("click", "#buttons-id", function () {
    if (dimensionCounter < 2) {
      var buttonValue = $(this).attr("value");
      $("#data-input").append(buttonValue + " x ");
      dimensionCounter++;
    }
    else if (dimensionCounter < 3) {
      var buttonValue = $(this).attr("value");
      $("#data-input").append(buttonValue + " ");
      dimensionCounter++;
      getTypeButtons();
    }
  });

  $("body").on("click", "#type-buttons-id", function () {
    if (dimensionCounter < 4) {
      var buttonValue = $(this).attr("value");
      $("#data-input").append(buttonValue + " = ");
      dimensionCounter++;
      getQuantityButtons();
    }
  });



  getDimensionButtons();
});
//Main Process