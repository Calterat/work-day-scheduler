// the current day is displayed at the top of the calendar

let today = moment();
let hourStart = moment().hour(9);
let tasks = [];

const loadData = () => {

    // pull from localStorage
    tasks = JSON.parse(localStorage.getItem("tasks"));

    // validate data from localStorage
    if (!tasks) {
        tasks = [{id: 0,info: ''},{id: 1,info: ''},{id: 2,info: ''},{id: 3,info: ''},
                {id: 4,info: ''},{id: 5,info: ''},{id: 6,info: ''},{id: 7,info: ''},
                {id: 8,info: ''}];
    }

    // generates the interactive web page content
    for (i=0; i<9; ++i) {
        if (i===0) {
            createHour(hourStart.format("hA"));
        } else {
            createHour(hourStart.add(1,'h').format("hA"));
        }
    }
}

// save tasks
const saveTasksToStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// color-code blocks to indicate past, present, or future

const auditTask = (newTaskEl) => {

    if (moment().isBefore(hourStart, 'hour')) {
        newTaskEl.addClass("future");
    } else if (moment().isAfter(hourStart, 'hour')) {
        newTaskEl.addClass("past");
    } else {
        newTaskEl.addClass("present");
    }
    return newTaskEl;
}

// create a time block
const createHour = (hour) => {

    // creates row wrapper for the columns
    let newRowEl = $("<div>")
        .addClass("row");

    // creates hour column
    let newHourEl = $("<div>")
        .addClass("hour col-1 pt-3")
        .text(hour);

    // clickable timeblock for entering or editing event
    let newTaskEl = $("<textarea>")
        .addClass("col-10")
        .attr("data-id", i)
        // this loads save info if anything was stored, otherwise it is just blank
        .text(tasks[i].info);

    // creates save button with icon from fontawesome
    let newSaveEl = $("<button>")
        .addClass("saveBtn col-1 fas fa-save")
        .attr("data-id", i);

    // checks newTask element
    auditTask(newTaskEl);

    newRowEl.append(newHourEl).append(newTaskEl).append(newSaveEl);
    
    $(".container").append(newRowEl);
}

// click save button to store in tasks array
const saveTask = (event) => {

    let dataId = parseInt(event.target.getAttribute("data-id"));
    let taskInfo = $(`textarea[data-id='${dataId}']`).val();

    // checks exising task index and rewrites with any new info
    if (tasks[dataId].id === dataId) {
        tasks[dataId].info = taskInfo;
    }

    // run fuction to save the tasks to localStorage
    saveTasksToStorage();

};

// load any saved data and generate interactive content
loadData();

// displays current day
$("#currentDay").text(today.format("dddd, MMMM Do"));

// listens for save click
$(".container").on("click", "button", saveTask);

// refresh shows persistent data