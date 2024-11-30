const taskCounter = document.getElementById('task-counter');
const progressBar = document.getElementById('progress-bar');
let totalTasks = 0;
let completedTasks = 0;
let confettiTriggered = false;
let editInput = null;
var circle = document.querySelector('circle');
var radius = circle.r.baseVal.value;
var circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;

function updateProgressBar() {
    const progress = totalTasks === 0 ? 0 : completedTasks / totalTasks;
    const offset = circumference - progress * circumference;

    circle.style.strokeDashoffset = offset;

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
        updateProgressBar();
        li.remove();
    });

    taskControls.appendChild(taskSpan);
    taskControls.appendChild(editButton);
    taskControls.appendChild(deleteButton);

    li.appendChild(checkbox);
    li.appendChild(taskControls);

    document.getElementById('task-list').appendChild(li);

    if (text === null) totalTasks++;
    if (completed) completedTasks++;

    updateProgressBar();

    if (text === null) document.getElementById('new-task').value = '';
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

$('[data-select-all-click]').click(function() {
    var selfAllSelector = $(this).data('select-all-click');
    boardInputs = $('[data-select-all=' + selfAllSelector + '] input');
    boardInputs.prop('checked', !boardInputs.prop('checked') );
});

$('.clear').click(function() {
    $('#task-list').empty();
    totalTasks = 0;
    completedTasks = 0;
    updateProgressBar();
});

function sortList() {
    var list, i, switching, listItems, shouldSwitch, direction, switchcount = 0;
    list = document.getElementById("task-list");
    switching = true;
    direction = "asc";

    while (switching) {
      switching = false;
      listItems = list.getElementsByTagName("LI");

      for (i = 0; i < (listItems.length - 1); i++) {
        shouldSwitch = false;

        if (direction == "asc") {
          if (listItems[i].innerHTML.toLowerCase() > listItems[i + 1].innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (direction == "desc") {
          if (listItems[i].innerHTML.toLowerCase() < listItems[i + 1].innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        listItems[i].parentNode.insertBefore(listItems[i + 1], listItems[i]);
        switching = true;
        switchcount++;
      } else {
        if (switchcount == 0 && direction == "asc") {
          direction = "desc";
          switching = true;
        }
      }
    }
}
  
var sortBtn = document.querySelector(".sort");
sortBtn.addEventListener("click", sortList, false );

// Show different text for priority
$("#priority").prepend("<option value='" + $("#priority").val() + "' data-value='selected' selected hidden>" + $("#priority").val() + "</option>");

$("#priority").on('change', function() {
    var val = $("#priority").val();
    $("#priority option[data-value='selected']").attr('value', val);
    $("#priority option[data-value='selected']").text(val);
    $("#priority").val(val);
});

// Save toggle button
function isChecked(isOn) {
    localStorage.setItem("hideMusic", JSON.stringify(isOn));
    if (isOn === false) $("#player").show();
    else $("#player").hide();
}

var checked = JSON.parse(localStorage.getItem("hideMusic"));
    document.getElementById("hideMusic").checked = checked;

$(document).ready(function(){
    isChecked(checked)
    $("#toggle-button .switch input").on("change", function(e) {
    const isOn = e.currentTarget.checked;
    isChecked(isOn);
  });
});