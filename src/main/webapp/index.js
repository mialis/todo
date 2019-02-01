//USER TODO

let users = [];
let userId;

function createSelect(users) {
  const selectUser = document.createElement("select");
  selectUser.className = "select";
  users.forEach(user => {
    selectUser.appendChild(createUserTodoOption(user));
  });
  selectUser.value = userId;
  selectUser.addEventListener("change", () => {
    userId = selectUser.value;
    loadTodos();
  });
  return selectUser;
}

function createUserTodoOption(user) {
  const option = document.createElement("option");
  option.value = user.id;
  option.appendChild(
    document.createTextNode(user.firstname + " " + user.lastname)
  );
  return option;
}

function loadTodos() {
  getTodos(userId).then(addToDos);
}

let todos = [];

function createTodoAppDiv(todos) {
  const div = document.createElement("div");
  const todoInputElement = createTodoTextInput();
  div.appendChild(createSelect(users));
  if (userId) {
    div.appendChild(todoInputElement);
    div.appendChild(createTodoAddButton(todoInputElement));
    div.appendChild(createTodoList(todos));
  }
  return div;
}

function createTodoTextInput() {
  const inputText = document.createElement("input");
  inputText.type = "text";
  inputText.className = "inputText";
  inputText.addEventListener("keypress", function handleKeyPress(e) {
    var key = e.keyCode || e.which;
    if (inputText.value != "" && userId != null) {
      if (key == 13) {
        addTodoDB(inputText.value).then(createTodo);
      }
    }
  });
  return inputText;
}

function createTodoAddButton(todoInputElement) {
  const button = document.createElement("input");
  button.type = "button";
  button.value = "ADD";
  button.className = "addButton";
  button.addEventListener("click", () => {
    if (todoInputElement.value != "") {
      addTodoDB(todoInputElement.value).then(createTodo);
    }
  });
  return button;
}

function createTodo(todo) {
  todos.push(todo);
  render();
}

function createTodoList(todos) {
  const ul = document.createElement("ul");
  todos.forEach((todo, index) => {
    ul.appendChild(createTodoElement(todo, index));
  });
  return ul;
}

function createTodoElement(todo, index) {
  const li = document.createElement("li");
  li.className = "li";
  li.appendChild(createTodoCheckBoxInput(todo));
  li.appendChild(document.createTextNode(todo.text));
  if (todo.done) {
    li.appendChild(createTodoDeleteButton(index, todo));
  }
  return li;
}

function createTodoCheckBoxInput(todo) {
  const checkBoxInput = document.createElement("input");
  checkBoxInput.type = "checkbox";
  checkBoxInput.className = "checkbox";
  checkBoxInput.checked = todo.done;
  checkBoxInput.addEventListener("click", () => {
    checkTodo(todo);
    checkTodoDB(todo);
  });
  return checkBoxInput;
}

function checkTodo(todo) {
  todo.done = !todo.done;
  render();
}

function createTodoDeleteButton(index, todo) {
  const button = document.createElement("input");
  button.type = "button";
  button.value = "DELETE";
  button.className = "deleteButton";
  button.addEventListener("click", () => {
    deleteTodo(index);
    deleteTodoDB(todo);
  });
  return button;
}

function deleteTodo(index) {
  todos.splice(index, 1);
  render();
}

function render() {
  document.body.innerHTML = "";
  document.body.appendChild(createTodoAppDiv(todos));
}

// JSON HANDLING
function addToDos(data) {
  todos = data;
  render();
}

function getTodos(userId) {
  return fetch("http://localhost:8080/todo/" + userId).then(response =>
    response.json()
  );
}

function addUsers(data) {
  users = data;
  render();
}

function getUsers() {
  return fetch("http://localhost:8080/user").then(response => response.json());
}

function main() {
  // getTodos().then(data => {
  // addToDos(data)
  // })
  getUsers().then(addUsers);
}

main();

function addTodoDB(text) {
  return fetch("http://localhost:8080/todo/" + userId, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({ text })
  }).then(response => response.json());
}

function checkTodoDB(todo) {
  fetch("http://localhost:8080/todo/" + userId + "/" + todo.id + "/done", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "PUT",
    body: JSON.stringify(todo)
  });
}

function deleteTodoDB(todo) {
  fetch("http://localhost:8080/todo/" + userId + "/" + todo.id, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "DELETE",
    body: JSON.stringify(todo)
  });
}

// Promise.resolve(4).then(data =>)

// Promise.resolve(Promise.resolve(6)).then(data => )

// Promise.resolve(7).then(x => x*x).then(data =>)
