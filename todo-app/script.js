
const form  = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos'));

if(todos) {
    todos.forEach(todo => {
        addTodo(todo)
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault(); // overrides  default event which is refreshing the page

    addTodo();
})

/**
 * @descripton Function for adding a todo.
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
        
        // left click event handler to mark todo as completed
        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');
            updateLS();
        });

        // right click event handler to remove todo
        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            
            todoEl.remove();
            updateLS();
        })

        todosUL.appendChild(todoEl);

        input.value = '';

        updateLS();
    }
}
/**
 * Function for updating local storage.
 * 
 */
function updateLS() {
    const todosEl = document.querySelectorAll('li');

    const todos = [];
    
    todosEl.forEach(todoEl => {
        todos.push ({
            text: todoEl.innerText,
            completed:todoEl.classList.contains("completed"),
        })
    })
    localStorage.setItem("todos", JSON.stringify(todos));
}