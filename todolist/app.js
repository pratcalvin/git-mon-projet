var taskList = document.getElementById("taskList");

window.onload = function () {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTask(task));
};

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();

    if (taskText === "") return;

    createTask(taskText);
    saveTasks();

    taskInput.value = "";
}

function createTask(taskText) {
    var li = document.createElement("li");

    var span = document.createElement("span");
    span.textContent = taskText;

    var actions = document.createElement("div");
    actions.className = "actions";

    var editButton = document.createElement("button");
    editButton.innerHTML = '<ion-icon name="pencil-outline"></ion-icon>';
    editButton.onclick = function () {
        editTask(span);
    };

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';
    deleteButton.onclick = function () {
        deleteTask(li);
    };

    actions.appendChild(editButton);
    actions.appendChild(deleteButton);

    li.appendChild(span);
    li.appendChild(actions);

    taskList.appendChild(li);
}

function editTask(span) {
    var newTaskText = prompt("Modifier la tâche :", span.textContent);

    if (newTaskText === null || newTaskText.trim() === "") return;

    span.textContent = newTaskText;

    saveTasks();
}

function deleteTask(li) {
    var confirmDelete = confirm("Tu veux vraiment supprimer cette tâche ?");

    if (confirmDelete) {
        li.remove();
        saveTasks();
    }
}


function saveTasks() {
    var tasks = [];

    document.querySelectorAll("#taskList li span").forEach(span => {
        tasks.push(span.textContent);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}