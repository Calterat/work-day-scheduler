// the current day is displayed at the top of the calendar

let date = moment();

$("#currentDay").text(date.format("dddd, MMMM Do"));


// create time blocks for standard business hours

// color-code blocks to indicate past, present, or future

// click into timeblock to enter event or edit it

// click save button to store in localStorage

// refresh shows persistent data