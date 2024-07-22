/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// CONCATENATED MODULE: ./src/js/renderTask.js
function renderTask(taskText, button) {
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
}
;
;// CONCATENATED MODULE: ./src/js/task.js
class Task {
  constructor(text) {
    this.text = text;
    this.id = Date.now();
    this.isPinned = false;
  }
}
;// CONCATENATED MODULE: ./src/js/buttons.js
function createPinButton(task, pinTask) {
  const pinButton = document.createElement('button');
  pinButton.className = 'button pin-btn';
  pinButton.addEventListener('click', () => pinTask(task));
  return pinButton;
}
function createUnpinButton(task, unpinTask) {
  const unpinButton = document.createElement('button');
  unpinButton.className = 'button unpin-btn';
  unpinButton.addEventListener('click', () => unpinTask(task));
  return unpinButton;
}
;// CONCATENATED MODULE: ./src/js/tasks-widjet.js



class TasksWidget {
  constructor(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    this.enterInput = this.enterInput.bind(this);
    this.filterTasks = this.filterTasks.bind(this);
    this.pinTask = this.pinTask.bind(this);
    this.unpinTask = this.unpinTask.bind(this);
    this.allTasks = [];
    this.pinnedTasks = [];
    this.filterText = '';
    this._element = element;
    this._form = this._element.querySelector('.tasks-widget-form');
    this._errorMessage = this._element.querySelector('.error-message');
    this._input = this._element.querySelector('.input-task-text');
    this._taskList = this._element.querySelector('.all-tasks');
    this._pinnedTasksList = this._element.querySelector('.pinned-tasks');
    this._noPinnedTasksMessage = this._element.querySelector('.no-pinned');
    this._noTasksMessage = this._element.querySelector('.no-tasks');
    this._input.addEventListener('input', this.filterTasks);
    this._input.addEventListener('keydown', this.enterInput);
    this.updateTaskLists();
  }
  enterInput(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const taskText = this._input.value.trim();
      if (taskText !== '') {
        const newTask = new Task(taskText);
        this.allTasks.push(newTask);
        this.updateTaskLists();
        this._errorMessage.style.display = 'none';
      } else {
        this._errorMessage.textContent = 'Введите значение в поле';
        this._errorMessage.style.display = 'block';
      }
      this._form.reset();
    }
  }
  filterTasks() {
    this.filterText = this._input.value.trim().toLowerCase();
    this.updateTaskLists();
  }
  clear(element) {
    const tasks = element.querySelectorAll('.task-item');
    tasks.forEach(task => task.remove());
  }
  updateTaskLists() {
    this.clear(this._taskList);
    this.clear(this._pinnedTasksList);
    const filteredTasks = this.allTasks.filter(task => !task.isPinned && task.text.toLowerCase().startsWith(this.filterText));
    if (filteredTasks.length === 0 && this.filterText !== '') {
      this._noTasksMessage.style.display = 'block';
    } else {
      this._noTasksMessage.style.display = 'none';
      filteredTasks.forEach(task => {
        const pinButton = createPinButton(task, this.pinTask);
        const taskElement = renderTask(task.text, pinButton);
        this._taskList.appendChild(taskElement);
      });
    }
    this.updatePinnedTasks();
  }
  pinTask(task) {
    task.isPinned = true;
    this.pinnedTasks.push(task);
    this.allTasks = this.allTasks.filter(t => t.id !== task.id);
    this.updateTaskLists();
  }
  unpinTask(task) {
    task.isPinned = false;
    this.allTasks.push(task);
    this.pinnedTasks = this.pinnedTasks.filter(t => t.id !== task.id);
    this.updateTaskLists();
  }
  updatePinnedTasks() {
    if (this.pinnedTasks.length === 0) {
      this._noPinnedTasksMessage.style.display = 'block';
    } else {
      this._noPinnedTasksMessage.style.display = 'none';
      this.clear(this._pinnedTasksList);
      this.pinnedTasks.forEach(task => {
        const unpinButton = createUnpinButton(task, this.unpinTask);
        const taskElement = renderTask(task.text, unpinButton);
        this._pinnedTasksList.appendChild(taskElement);
      });
    }
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

const tasksWidget = new TasksWidget('.tasks-widget');
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;