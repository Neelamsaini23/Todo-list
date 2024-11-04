document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskTime = document.getElementById('task-time');
    const timeUnit = document.getElementById('time-unit');
    const taskType = document.getElementById('task-type');
    const taskList = document.getElementById('task-list');
    const deleteAllBtn = document.getElementById('delete-all-btn');

    // Converts time to milliseconds based on the selected unit
    function convertToMilliseconds(timeValue, unitValue) {
        switch (unitValue) {
            case 'minutes': return timeValue * 60000;
            case 'hours': return timeValue * 3600000;
            case 'days': return timeValue * 86400000;
            case 'weeks': return timeValue * 604800000;
            case 'months': return timeValue * 2628000000;
            default: return 0;
        }
    }

    // Creates a new task element
    function createTaskElement(taskValue, timeValue, unitValue, typeValue) {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <span class="task">${taskValue} (${timeValue} ${unitValue}) - ${typeValue}</span>
            <div class="task-buttons">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
                <button class="complete-btn">Complete</button>
            </div>
        `;
        return li;
    }

    // Handles form submission to add a new task
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const taskValue = taskInput.value.trim();
        const timeValue = parseInt(taskTime.value);
        const unitValue = timeUnit.value;
        const typeValue = taskType.value;

        if (taskValue && !isNaN(timeValue) && timeValue > 0) {
            const taskElement = createTaskElement(taskValue, timeValue, unitValue, typeValue);
            taskList.appendChild(taskElement);

            const timeInMs = convertToMilliseconds(timeValue, unitValue);

            // Automatically mark task as complete after specified time
            setTimeout(() => {
                if (!taskElement.classList.contains('completed')) {
                    taskElement.classList.add('completed');
                    setTimeout(() => taskElement.remove(), 1000);
                }
            }, timeInMs);

            // Complete task manually
            taskElement.querySelector('.complete-btn').addEventListener('click', () => {
                taskElement.classList.add('completed');
                setTimeout(() => taskElement.remove(), 1000);
            });

            // Delete task manually
            taskElement.querySelector('.delete-btn').addEventListener('click', () => {
                taskElement.remove();
            });

            // Edit task
            taskElement.querySelector('.edit-btn').addEventListener('click', () => {
                const newTaskValue = prompt('Edit task:', taskValue) || taskValue;
                const newTimeValue = parseInt(prompt('Edit time:', timeValue)) || timeValue;
                const newUnitValue = prompt('Edit time unit:', unitValue) || unitValue;

                if (!isNaN(newTimeValue) && newTimeValue > 0) {
                    taskElement.querySelector('.task').innerHTML = `${newTaskValue} (${newTimeValue} ${newUnitValue}) - ${typeValue}`;
                } else {
                    alert("Invalid time value.");
                }
            });

            // Clear form inputs
            taskInput.value = '';
            taskTime.value = '';
        } else {
            alert("Please enter valid task details.");
        }
    });

    // Deletes all tasks
    deleteAllBtn.addEventListener('click', () => {
        taskList.innerHTML = '';
    });
});
