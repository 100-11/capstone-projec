// Get references to the form and task list
const taskForm = document.getElementById('taskForm');
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const taskDeadline = document.getElementById('taskDeadline');
const taskPriority = document.getElementById('taskPriority');
const taskList = document.getElementById('taskList');

const addTaskBtn = document.getElementById('addTaskBtn');

addTaskBtn.addEventListener('click', function() {
    console.log('Button clicked!');
    // You can add your task adding logic here
});


// Function to add a new task
async function addTask(event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    const taskData = {
        title: taskTitle.value,
        description: taskDescription.value,
        deadline: taskDeadline.value,
        priority: taskPriority.value,
    };

    // Send a POST request to the backend to add the task
    try {
        const response = await fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });

        const newTask = await response.json();
        displayTask(newTask); // Add task to the UI
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

// Function to delete a task
async function deleteTask(taskId) {
    try {
        const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.getElementById(taskId).remove(); // Remove task from the UI
        }
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

// Function to display tasks in the UI
function displayTask(task) {
    const taskItem = document.createElement('li');
    taskItem.id = task._id; // Use the task ID as the list item ID
    taskItem.innerHTML = `
        <div>
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Deadline: ${task.deadline}</p>
            <p>Priority: ${task.priority}</p>
        </div>
        <button class="delete" onclick="deleteTask('${task._id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);
}

// Load and display existing tasks from the backend when the page loads
async function loadTasks() {
    try {
        const response = await fetch('http://localhost:3000/api/tasks');
        const tasks = await response.json();

        tasks.forEach(displayTask);
    } catch (error) {
        console.error('Error loading tasks:', error);
    }
}

// Add event listener to handle form submission
taskForm.addEventListener('submit', addTask);

// Load tasks when the page loads
window.onload = loadTasks;
