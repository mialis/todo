let todos = [];

function createTodoAppDiv(todos) {
  const div = document.createElement("div");
  const todoInputElement = createTodoTextInput();
  div.appendChild(todoInputElement);
  div.appendChild(createTodoAddButton(todoInputElement));
  div.appendChild(createTodoList(todos));
  return div;
}

function createTodoTextInput() {
  const inputText = document.createElement("input");
  inputText.type = "text";
  return inputText;
}

function createTodoAddButton(todoInputElement) {
  const button = document.createElement("input");
  button.type = "button";
  button.value = "ADD";
  button.addEventListener("click", () => {
    addTodoDB(createTodo(todoInputElement.value));
  });
  return button;
}

function createTodo(text) {
  const newTodo = { done: false, text };
  todos.push(newTodo);
  render();
  return newTodo;
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
  li.appendChild(createTodoCheckBoxInput(todo));
  li.appendChild(document.createTextNode(todo.text));
  if (todo.done) {
    li.appendChild(createTodoDeleteButton(index));
  }
  return li;
}

function createTodoCheckBoxInput(todo) {
  const checkBoxInput = document.createElement("input");
  checkBoxInput.type = "checkbox";
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

function createTodoDeleteButton(index) {
  const button = document.createElement("input");
  button.type = "button";
  button.value = "DELETE";
  button.style.backgroundColor = "red";
  button.addEventListener("click", () => {
    deleteTodo(index);
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

function getTodos() {
  return fetch("http://localhost:8080/todo").then(response => response.json());
}

function main() {
  // getTodos().then(data => {
  // addToDos(data)
  // })
  getTodos().then(addToDos);
}

main();

function addTodoDB(todo) {
  fetch("http://localhost:8080/todo", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(todo)
  }).then(response => response);
}

function checkTodoDB(todo) {
  fetch("http://localhost:8080/todo/" + todo.id + "/done", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "PUT",
    body: JSON.stringify(todo)
  }).then(response => response);
}

// Promise.resolve(4).then(data =>)

// Promise.resolve(Promise.resolve(6)).then(data => )

// Promise.resolve(7).then(x => x*x).then(data =>)
