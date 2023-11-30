// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
//$(function () {
// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?
//
// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the
// past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?
//
// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?
//
// TODO: Add code to display the current date in the header of the page.
//});
$(document).ready(function () {
  $("#currentDay").text(dayjs().format("dddd, MMM D"));//displays the current time and date in the header

  // Function to set time-block colors
  function setColors() {
    var currentHour = dayjs().hour();

    // Loop through each time-block
    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      // Removes the class from each time-block past present future 
      $(this).removeClass("past present future");

      // Add new class based on the current hour
      if (blockHour < currentHour) {
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }
  //callback to set colors
  setColors();

  // click event for saveButton
  $(".saveBtn").on("click", function () {
    var hour = $(this).parent().attr("id");
    var description = $(this).siblings(".description").val();

    // Saves the time and description to local storage
    localStorage.setItem(hour, description);
  });

  // Load saved tasks from local storage
  $(".time-block").each(function () {
    var hour = $(this).attr("id");
    var description = localStorage.getItem(hour);

    if (description) {
      $(this).children(".description").val(description);
    }
  });
});;