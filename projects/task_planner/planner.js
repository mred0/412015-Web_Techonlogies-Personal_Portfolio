const taskForm = document.getElementById("taskForm");
const taskTitleInput = document.getElementById("taskTitle");
const taskPrioritySelect = document.getElementById("taskPriority");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

let tasks = [];

/* ================================
   Load Tasks from Local Storage
================================ */
window.addEventListener("load", () => {
  const savedTasks = localStorage.getItem("taskPlannerTasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    renderTasks();
  }
});

/* ================================
   Add New Task
================================ */
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = taskTitleInput.value.trim();
  const priority = taskPrioritySelect.value;

  if (title === "") return;

  const task = {
    id: Date.now(),
    title: title,
    priority: priority,
    completed: false,
  };

  tasks.push(task);
  saveTasks();
  renderTasks();

  taskForm.reset();
});

/* ================================
   Render Tasks
================================ */
function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    emptyMessage.style.display = "block";
    return;
  } else {
    emptyMessage.style.display = "none";
  }

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item";
    if (task.completed) li.classList.add("completed");

    const infoDiv = document.createElement("div");
    infoDiv.className = "task-info";

    const titleSpan = document.createElement("span");
    titleSpan.className = "task-title";
    titleSpan.textContent = task.title;

    const metaSpan = document.createElement("span");
    metaSpan.className = "task-meta";
    metaSpan.textContent = "Priority: " + task.priority;

    infoDiv.appendChild(titleSpan);
    infoDiv.appendChild(metaSpan);

    const actionDiv = document.createElement("div");
    actionDiv.className = "task-actions";

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Done";
    completeBtn.className = "complete";

    completeBtn.addEventListener("click", () => {
      toggleComplete(task.id);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete";

    deleteBtn.addEventListener("click", () => {
      deleteTask(task.id);
    });

    actionDiv.appendChild(completeBtn);
    actionDiv.appendChild(deleteBtn);

    li.appendChild(infoDiv);
    li.appendChild(actionDiv);

    taskList.appendChild(li);
  });
}

/* ================================
   Toggle Complete
================================ */
function toggleComplete(id) {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });

  saveTasks();
  renderTasks();
}

/* ================================
   Delete Task
================================ */
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  renderTasks();
}

/* ================================
   Save Tasks
================================ */
function saveTasks() {
  localStorage.setItem("taskPlannerTasks", JSON.stringify(tasks));
}

let isLogin = true;

function openAuth() {
  document.getElementById("authOverlay").style.display = "flex";
}

function closeAuth() {
  document.getElementById("authOverlay").style.display = "none";
}

function toggleAuth() {
  isLogin = !isLogin;
  document.getElementById("authTitle").innerText = isLogin
    ? "Login"
    : "Register";
  document.querySelector(".auth-box button").innerText = isLogin
    ? "Login"
    : "Register";
}

/* ================================
  Auth
================================ */

function handleAuth() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users") || "{}");

  if (isLogin) {
    if (users[username] === password) {
      alert("Login successful");
      closeAuth();
    } else {
      alert("Invalid credentials");
    }
  } else {
    if (users[username]) {
      alert("User already exists");
    } else {
      users[username] = password;
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registration successful");
      toggleAuth();
    }
  }
}
