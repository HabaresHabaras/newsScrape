// Grab the articles as a json
$.getJSON("/articles", function (data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    if (data[i].saved === true) {
      $("#savedArticles").append("<p> <br>" + data[i].title + "</p>")
    } else {
      // Display the apropos information on the page
      $("#articles").append("<p class='blueTitle'> <br>" + data[i].title + "<button class='noteButton btn btn-success' data-id='" + data[i]._id + "'data-toggle='modal' data-target='#noteModal'> Note </button><button class='saveButton btn btn-danger'data-id='" + data[i]._id + "'> Save </button>" + "</p>" + "<p class='newsBody'>" + data[i].link + "</p>");

    }
  }

});


// Whenever someone clicks a p tag
$(document).on("click", "button", function () {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function (data) {
      console.log(data);
      // The titla3wv e of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// Whenever someone clicks a p tag
$(document).on("click", "button", function () {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function (data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });
  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});


$(document).on("click", "#saveButton", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: 
    JSON.stringify({
      saved : true
    })
  })
});
//TO DO
//MONGO
// SAVE ARTICLES ON A THIRD COLLECTION THAT IT'S NOT ALL OF
// THE SCRAPED ARTICLES, INSTEAD ITS ONLY THE ARTICLES THE USER CLICKS
// ON THEIR SAVE BUTTON

// RETRIEVE THE NOTES FROM THE MONGO NOTES COLLECTION AND LOGS THEM
// ON THE VIEWPORT FOR THE USER TO SEE

// INDEX.HTML
// DISPLAY THE NOTES AND MAKE THE SCRAPE ARTICLES BUTTON POP UP A MODAL
// ADD THE SAVE AND NOTES BUTTONS ON ALL THE ARTICLES
// STYLE ARTICLES WITH BOOTSTRAP
//


