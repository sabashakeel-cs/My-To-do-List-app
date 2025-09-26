const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage
window.onload = loadTasks;

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const task = { text: taskText, completed: false };
  addTaskToDOM(task);
  saveTask(task);

  taskInput.value = ""; // clear input
}

function addTaskToDOM(task) {
  const li = document.createElement("li");
  li.textContent = task.text;

  if (task.completed) li.classList.add("completed");

  // Toggle complete on click
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    toggleComplete(task.text);
  });

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.onclick = (e) => {
    e.stopPropagation(); // prevent li click
    li.remove();
    removeTask(task.text);
  };

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Save task
function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(addTaskToDOM);
}

// Remove task
function removeTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Toggle complete
function toggleComplete(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map((task) =>
    task.text === taskText ? { ...task, completed: !task.completed } : task
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear all
function clearAll() {
  taskList.innerHTML = "";
  localStorage.removeItem("tasks");
}

addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearAll);

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});
