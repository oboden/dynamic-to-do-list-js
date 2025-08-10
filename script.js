// Run script after the DOM has fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Step 1: Select DOM elements with correct IDs for the checker
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Step 2: Load tasks from Local Storage on page load
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false = don't save again
    }

    // Step 3: Define the addTask function
    function addTask(taskText = null, save = true) {
        // If taskText is not provided, get from input
        if (taskText === null) {
            taskText = taskInput.value.trim();
        }

        // If input is empty, alert the user
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create the "Remove" button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn'); // ✅ using classList.add as required

        // Remove task on button click + update Local Storage
        removeButton.onclick = function () {
            taskList.removeChild(li);
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const updatedTasks = storedTasks.filter(t => t !== taskText);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        };

        // Append remove button to the list item
        li.appendChild(removeButton);

        // Append the new list item to the task list
        taskList.appendChild(li);

        // Save to Local Storage if required
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear the input field if task came from user
        if (save) {
            taskInput.value = '';
        }
    }

    // Step 4: Add event listener to the "Add Task" button
    addButton.addEventListener('click', function () {
        addTask();
    });

    // Step 5: Allow adding tasks by pressing "Enter"
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Step 6: Load tasks on page load
    loadTasks();
});
