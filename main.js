document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");

    // Retrieve tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Render tasks from local storage
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";
            li.innerHTML = `
                <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
                <span class="task-actions">
                    <span class="task-complete" data-index="${index}">${task.completed ? '✔' : '◻'}</span>
                    <span class="delete-task" data-index="${index}">❌</span>
                </span>
            `;
            taskList.appendChild(li);
        });
    }

    // Add a new task
    function addTask() {
        const text = taskInput.value.trim();
        if (text !== "") {
            tasks.push({ text, completed: false });
            taskInput.value = "";
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        }
    }

    // Mark a task as complete
    function toggleComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }

    // Delete a task
    function deleteTask(index) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }

    addTaskButton.addEventListener("click", addTask);
    taskInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });

    taskList.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        if (event.target.classList.contains("task-complete")) {
            toggleComplete(index);
        } else if (event.target.classList.contains("delete-task")) {
            deleteTask(index);
        }
    });

    renderTasks();
});
