const taskCounter = document.getElementById('task-counter');
const progressBar = document.getElementById('progress-bar');
let totalTasks = 0;
let completedTasks = 0;
let confettiTriggered = false;
let editInput = null;

function updateTaskCounter() {
    taskCounter.textContent = `${completedTasks}/${totalTasks}`;
}

function updateProgressBar() {
    const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    progressBar.style.width = `${progress}%`;

    if (totalTasks > 0 && completedTasks === totalTasks && !confettiTriggered) {
        triggerConfetti();
        confettiTriggered = true;
    } else if (completedTasks !== totalTasks) {
        confettiTriggered = false;
    }
}

function triggerConfetti(event) {
    const x = event ? event.clientX / window.innerWidth : 0.5;
    const y = event ? event.clientY / window.innerHeight : 0.5;

    confetti({
        particleCount: 150,
        angle: 60,
        spread: 70,
        origin: { x, y },
        colors: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#F9FF33'],
        shapes: ['circle', 'square'],
        scalar: 1.2,
        drift: 0.5,
        gravity: 0.6
    });

    confetti({
        particleCount: 150,
        angle: 120,
        spread: 70,
        origin: { x, y },
        colors: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#F9FF33'],
        shapes: ['circle', 'square'],
        scalar: 1.2,
        drift: 0.5,
        gravity: 0.6
    });
}

function addTask(text = null, completed = false) {
    const taskText = text !== null ? text : document.getElementById('new-task').value;
    if (taskText === '') return;

    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkbox.checked = completed;
    if (completed) li.classList.add('completed');
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            li.classList.add('completed');
            completedTasks++;
        } else {
            li.classList.remove('completed');
            completedTasks--;
        }
        updateTaskCounter();
        updateProgressBar();
    });

    const taskControls = document.createElement('div');
    taskControls.className = 'task-controls';

    const taskSpan = document.createElement('span');
    taskSpan.className = 'task-text';
    taskSpan.textContent = taskText;

    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.className = 'edit';
    editButton.addEventListener('click', function() {
        document.getElementById('new-task').value = taskSpan.textContent;
        document.getElementById('new-task').focus();
        editInput = taskSpan;
    });

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.className = 'delete';
    deleteButton.addEventListener('click', function() {
        if (checkbox.checked) {
            completedTasks--;
        }
        totalTasks--;
        updateTaskCounter();
        updateProgressBar();
        li.remove();
    });

    taskControls.appendChild(taskSpan);
    taskControls.appendChild(editButton);
    taskControls.appendChild(deleteButton);

    li.appendChild(checkbox);
    li.appendChild(taskControls);

    document.getElementById('task-list').appendChild(li);

    if (text === null) {
        totalTasks++;
    }
    if (completed) {
        completedTasks++;
    }
    updateTaskCounter();
    updateProgressBar();

    if (text === null) {
        document.getElementById('new-task').value = '';
    }
}

document.getElementById('add-task-button').addEventListener('click', function() {
    if (editInput) {
        editInput.textContent = document.getElementById('new-task').value;
        editInput = null;
    } else {
        addTask();
    }
    document.getElementById('new-task').value = '';
});

document.getElementById('new-task').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        if (editInput) {
            editInput.textContent = document.getElementById('new-task').value;
            editInput = null;
        } else {
            addTask();
        }
        document.getElementById('new-task').value = '';
    }
});

document.body.addEventListener('click', function(event) {
    if (totalTasks > 0 && completedTasks === totalTasks && !confettiTriggered) {
        triggerConfetti(event);
        confettiTriggered = true;
    }
});