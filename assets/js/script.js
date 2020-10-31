// the current day is displayed at the top of the calendar

let today = moment();

let hourStart = moment().hour(9);

$("#currentDay").text(today.format("dddd, MMMM Do"));

// create time blocks for standard business hours

const createHour = (hour) => {
    let newRow = $("<div>")
        .addClass("row");

    let newHour = $("<div>")
        .addClass("hour col-1 pt-3")
        .text(hour);

    let newTask = $("<textarea>")
        .addClass("col-10");

    let newSave = $("<button>")
        .addClass("saveBtn col-1")

    newRow.append(newHour).append(newTask).append(newSave);
    
    $(".container").append(newRow);
}

for (i=0; i<9; ++i) {
    if (i===0) {
        createHour(hourStart.format("hA"));
    } else {
        createHour(hourStart.add(1,'h').format("hA"));
    }
}

// color-code blocks to indicate past, present, or future

// click into timeblock to enter event or edit it

// click save button to store in localStorage

// refresh shows persistent data