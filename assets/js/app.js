
// Add Tast HTML templates
const addTask = () => {
  const ul = document.getElementById("todos");

  // create li element
  const li = document.createElement("li");

  const checked = document.createElement("input");
  checked.setAttribute('type', 'checkbox');

  checked.setAttribute('type', 'checkbox');

  const button = document.createElement("button");
  button.setAttribute('class', 'delete-item');
  button.textContent = 'x';

  // create id from timestamp
  const ids = new Date().getTime();
  li.setAttribute("id", ids);

  // set todo text
  li.append(checked, document.createTextNode(inputAdd.value), button);

  // append text to parent
  ul.appendChild(li);

  // create array from tasks and check localstorage
  let todos = [];
  if (window.localStorage.getItem('todos')) {
    todos = JSON.parse(window.localStorage.getItem('todos'));
  } else {
    window.localStorage.setItem('todos', JSON.stringify(todos));
  }

  const newTask = { title: inputAdd.value, completed: false, id: ids, checked: false };
  todos.push(newTask);
  window.localStorage.setItem('todos', JSON.stringify(todos));

  // empty input for new task
  inputAdd.value = '';
}

const readLocalStorage = () => {
  const ul = document.getElementById("todos");

  // create array from tasks and check localstorage
  let todos = [];
  if (window.localStorage.getItem('todos')) {
    todos = JSON.parse(window.localStorage.getItem('todos'));
  } else {
    window.localStorage.setItem('todos', JSON.stringify(todos));
  }

  for (const key in todos) {
    if (Object.hasOwnProperty.call(todos, key)) {
      const element = todos[key];

      // create li element
      const li = document.createElement("li");

      // create id from timestamp
      li.setAttribute("id", element.id);

      const checked = document.createElement("input");
      checked.setAttribute('type', 'checkbox');
      checked.checked = element.checked;

      const button = document.createElement("button");
      button.setAttribute('class', 'delete-item');
      button.textContent = 'x';

      // set todo text
      li.append(checked, document.createTextNode(element.title), button);

      // append text to parent
      ul.appendChild(li);

    }
  }
}

const removeByAttr = (arr, attr, value) => {
  var i = arr.length;
  while (i--) {
    if (arr[i]
      && arr[i].hasOwnProperty(attr)
      && (arr[i][attr] === value)) {

      arr.splice(i, 1);

    }
  }
  return arr;
}

// add task with button
document.querySelector('.addWrapper button').addEventListener('click', addTask);

// add task with enter
document.querySelector('.addWrapper input').addEventListener('keyup', (event) => {
  if (event.key === 'Enter' || event.keyCode === 13) {
    addTask();
  }
});

// remove item 
document.querySelector('#todos').addEventListener('click', (e) => {
  console.log(e.target.tagName);
  if (e.target.tagName == 'BUTTON') {
    const id = Number(e.target.parentElement.getAttribute('id'));
    let todos = [];
    if (window.localStorage.getItem('todos')) {
      todos = JSON.parse(window.localStorage.getItem('todos'));
    } else {
      window.localStorage.setItem('todos', JSON.stringify(todos));
    }

    removeByAttr(todos, 'id', id);
    console.log(todos);
    window.localStorage.setItem('todos', JSON.stringify(todos));

    e.target.parentElement.remove();
  }
})

readLocalStorage();
