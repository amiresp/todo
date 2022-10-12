
var timeAlert, alertResultTemp;
const alert = document.getElementById("alert");
alert.style.display = "none";
if (alert.classList.contains("show")) {
  alert.classList.remove("show");
}

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

      if (element.checked) {
        li.classList.add('checked');
      } else {
        li.classList.remove('checked');
      }

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

const checkedByAttr = (arr, attr, value) => {
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

const showConfirmMessage = () => {
  return new Promise(resolve => {
    alert.style.display = "block";
    alert.classList.add("show");
    let number = 5;
    // create div element
    const div = document.createElement("div");

    // create alert type
    div.setAttribute("type", "warn");

    const text = document.createElement("p");
    text.textContent = 'are you sure?';

    const button = document.createElement("button");
    button.textContent = 'Restore';

    const count = document.createElement("span");

    timeAlert = setInterval(() => {

      if (number === 0) {
        div.remove();
        alert.classList.remove("show");
        resolve(true);
      } else {
        --number;
      }
    }, 1000)
    count.textContent = number;


    button.addEventListener('click', () => {
      clearInterval(timeAlert);
      document.querySelector('#alert div').remove();
      alert.classList.remove("show");
      alert.style.display = "none";
      // return false;
      resolve(false);
    })

    // set alert text
    div.append(text, count, button);

    // append text to parent
    alert.appendChild(div);
    setTimeout(() => {

      let timerCount = setInterval(() => {
        if (number !== 0) {
          document.querySelector('#alert div span').textContent = number;
        } else {
          clearInterval(timerCount);
        }
      }, 500)
    }, 100)

  })

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
document.querySelector('#todos').addEventListener('click', async (e) => {
  console.log(e.target.tagName);
  if (e.target.tagName == 'BUTTON') {
    const alertResult = await showConfirmMessage();
    if (alertResult) {
      e.target.parentElement.remove();
      const id = Number(e.target.parentElement.getAttribute('id'));
      let todos = [];
      if (window.localStorage.getItem('todos')) {
        todos = JSON.parse(window.localStorage.getItem('todos'));
      } else {
        window.localStorage.setItem('todos', JSON.stringify(todos));
      }

      removeByAttr(todos, 'id', id);
      window.localStorage.setItem('todos', JSON.stringify(todos));

    } else {
    }
  }
})

// checked item 
document.querySelector('#todos').addEventListener('click', (e) => {
  console.log(e.target.tagName);
  if (e.target.tagName == 'INPUT') {
    const id = Number(e.target.parentElement.getAttribute('id'));
    let todos = [];
    if (window.localStorage.getItem('todos')) {
      todos = JSON.parse(window.localStorage.getItem('todos'));
    } else {
      window.localStorage.setItem('todos', JSON.stringify(todos));
    }

    // removeByAttr(todos, 'id', id);
    todos.map(el => el.id === id ? el.checked = e.target.checked : el);
    window.localStorage.setItem('todos', JSON.stringify(todos));

    if (e.target.checked) {
      e.target.parentElement.classList.add('checked');
    } else {
      e.target.parentElement.classList.remove('checked');
    }
  }
})

readLocalStorage();
