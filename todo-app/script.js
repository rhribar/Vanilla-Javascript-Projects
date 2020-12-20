
const form  = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos'));

if(todos) {
    todos.forEach(todo => {
        addTodo(todo)
    })
}

/**
 * Adding todo on submit.
 */
form.addEventListener('submit', (e) => {
    e.preventDefault(); // overrides  default event which is refreshing the page

    addTodo();
})

/**
 * Adding a todo. Not proud of this one. TODO: Break up this method to smaller reusable functions. :D
 * @param todo
 */
function addTodo(todo = {}) {
    let todoText = input.value;

    if(todo && todo.completed) {
        todoText = todo.text;
    } 

    if(todoText) {
        const todoEl = document.createElement("li");
        
        if(todo.completed) {
            todoEl.classList.add('completed');
        }

        todoEl.innerText = todoText;

        completeTodo(todoEl);
        removeTodo(todoEl);

        todosUL.appendChild(todoEl); // add new todos to list
        input.value = ''; // clear input
        updateLS();
    }
}

/**
 * Complete todo on left click.
 * @param {list} todoEl 
 */
function completeTodo(todoEl) {
    todoEl.addEventListener('click', () => {
        todoEl.classList.toggle('completed');
        updateLS();
    });
}

/**
 * Remove todo on right click.
 * @param {list} todoEl 
 */
function removeTodo(todoEl) {
    todoEl.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        
        todoEl.remove();
        updateLS();
    })
    console.log(todoEl);
}

/**
 * Update local storage.
 */
function updateLS() {
    const todosEl = document.querySelectorAll('li');

    const todos = [];
    
    todosEl.forEach(todoEl => {
        todos.push ({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed"),
        })
    })
    localStorage.setItem("todos", JSON.stringify(todos));
}