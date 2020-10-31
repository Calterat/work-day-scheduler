// the current day is displayed at the top of the calendar

let today = moment();
let hourStart = moment().hour(9);
let tasks = [];

$("#currentDay").text(today.format("dddd, MMMM Do"));

// color-code blocks to indicate past, present, or future

const auditTask = (newTask) => {

    if (moment().isBefore(hourStart, 'hour')) {
        newTask.addClass("future");
    } else if (moment().isAfter(hourStart, 'hour')) {
        newTask.addClass("past");
    } else {
        newTask.addClass("present");
    }
    return newTask;
}

// create time blocks for standard business hours

const createHour = (hour) => {
    let newRow = $("<div>")
        .addClass("row");

    // creates hour column
    let newHour = $("<div>")
        .addClass("hour col-1 pt-3")
        .text(hour);

    // click into timeblock to enter event or edit it
    let newTask = $("<textarea>")
        .addClass("col-10")
        .attr("data-id", i);

    // creates save button with icon from fontawesome
    let newSave = $("<button>")
        .addClass("saveBtn col-1")
        .attr("data-id", i)
        .html("<i class='fas fa-save'></i>");

    auditTask(newTask);

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

// click save button to store in localStorage

const saveTask = (event) => {

    let dataId = event.target.getAttribute("data-id");
    let taskInfo = $(`textarea[data-id='${dataId}']`).val();

    let tempTask = {
        id: dataId,
        info: taskInfo
    };

    tasks.push(tempTask);
};

$(".container").on("click", "button", saveTask);

// refresh shows persistent data