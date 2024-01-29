// Function to allow drop
function allowDrop(ev) {
    ev.preventDefault(); // Prevent default behavior (Prevent from not allowing to drop)
  }
  
  // Function to drag
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  // Function to drop
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    updateLocalStorage(); // Update the local storage to save the current state
  }
  
  // Function to create new task
  function createTask(board, text) {
    var task = document.createElement("div");
    task.className = "task";
    task.id = "task" + new Date().getTime(); // Unique ID for each task
    task.draggable = "true"; // Make it draggable
    task.ondragstart = drag;
    task.textContent = text;
    document.getElementById(board).appendChild(task);
  }
  
  // Initial tasks
  var tasks = {
    toDo: ["Task 1", "Task 2"],
    inProgress: ["Task 3"],
    done: ["Task 4"]
  };
  
  // Initialize app and load tasks from local storage if available
  function init() {
    if (localStorage.getItem("tasks")) {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    for (var board in tasks) {
      tasks[board].forEach(function (text) {
        createTask(board, text);
      });
    }
  }
  
  // Update local storage with the current state of tasks
  function updateLocalStorage() {
    var tasks = {
      toDo: Array.from(document.getElementById("toDo").getElementsByClassName("task")).map(task =>
        task.textContent),
      inProgress: Array.from(document.getElementById("inProgress").getElementsByClassName("task")).map(task =>
        task.textContent),
      done: Array.from(document.getElementById("done").getElementsByClassName("task")).map(task =>
        task.textContent)
    };
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  // Call the init function when window loads
  window.onload = init;
  