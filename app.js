const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const todoList = document.getElementById('incompleteTasks');
const completedList = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskString) {
  const taskElement = document.createElement('li');

  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editTaskInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  label.innerText = taskString;
  label.className = 'task';

  checkBox.type = 'checkbox';
  editTaskInput.type = 'text';
  editTaskInput.className = 'task';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  taskElement.appendChild(checkBox);
  taskElement.appendChild(label);
  taskElement.appendChild(editTaskInput);
  taskElement.appendChild(editButton);
  taskElement.appendChild(deleteButton);
  return taskElement;
};

const addTask = function () {
  if (!taskInput.value) return;
  const taskElement = createNewTaskElement(taskInput.value);

  todoList.appendChild(taskElement);
  bindTaskEvents(taskElement);

  taskInput.value = '';
};

const editTask = function () {
  const taskElement = this.parentNode;

  const editTaskInput = taskElement.querySelector('input[type=text]');
  const label = taskElement.querySelector('label');
  const editBtn = taskElement.querySelector('.edit');
  const isInEditMode = taskElement.classList.contains('editMode');

  if (isInEditMode) {
    label.innerText = editTaskInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editTaskInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  taskElement.classList.toggle('editMode');
};

const deleteTask = function () {
  const taskElement = this.parentNode;
  const ul = taskElement.parentNode;
  ul.removeChild(taskElement);
};

const toggleTask = function () {
  const taskElement = this.parentNode;
  const isCompleted = this.checked;
  const targetHolder = isCompleted ? completedList : todoList;

  targetHolder.appendChild(taskElement);
};

addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskElement) {
  const checkBox = taskElement.querySelector('input[type=checkbox]');
  const editButton = taskElement.querySelector('button.edit');
  const deleteButton = taskElement.querySelector('button.delete');

  editButton.addEventListener('click', editTask);
  deleteButton.addEventListener('click', deleteTask);
  checkBox.addEventListener('change', toggleTask);
};

const bindEventsToAllTasks = (container) => {
  Array.from(container.children).forEach((task) => bindTaskEvents(task));
};

bindEventsToAllTasks(todoList);
bindEventsToAllTasks(completedList);
