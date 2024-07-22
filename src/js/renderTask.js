export function renderTask(taskText, button) {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task-item';

    const taskContentDiv = document.createElement('div');
    taskContentDiv.className = 'task-content';

    const taskTextDiv = document.createElement('div');
    taskTextDiv.className = 'title';
    taskTextDiv.textContent = taskText;

    const taskButton = document.createElement('button');
    taskButton.className = 'button';

    taskContentDiv.appendChild(taskTextDiv);
    if (button) {
        taskContentDiv.appendChild(button); 
    }

    taskDiv.appendChild(taskContentDiv);

    return taskDiv;
}; 
