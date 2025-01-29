const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

let allTodos = JSON.parse(localStorage.getItem('todos')) || []; // Load todos from localStorage

// Initialize the list on page load
updateTodoList();

todoForm.addEventListener('submit', function (e) {
    e.preventDefault();
    addTodo();
});

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText.length > 0) {
        allTodos.push({ id: Date.now(), text: todoText, completed: false }); // Include completed status
        saveTodos();
        updateTodoList();
        todoInput.value = "";
    }
}

function updateTodoList() {
    todoListUL.innerHTML = "";
    allTodos.forEach(todo => {
        let todoItem = createTodoItem(todo);
        todoListUL.append(todoItem);
    });
}

function createTodoItem(todo) {
    const todoLI = document.createElement("li");
    todoLI.className = `todo ${todo.completed ? "completed" : ""}`; // Apply completed class if necessary
    todoLI.innerHTML = `
        <input type="checkbox" id="todo-${todo.id}" ${todo.completed ? "checked" : ""}>
        <label class="custom-checkbox" for="todo-${todo.id}">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="transparent">
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
            </svg>
        </label>
        <label for="todo-${todo.id}" class="todo-text">${todo.text}</label>
        <button class="delete-button">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--secondry-color)">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
        </button>
    `;

    // ✅ Handle marking as completed
    todoLI.querySelector('input[type="checkbox"]').addEventListener('change', (e) => {
        todo.completed = e.target.checked;
        saveTodos();
        updateTodoList(); // Refresh to apply styles
    });

    // ✅ Fix delete functionality using ID instead of index
    todoLI.querySelector('.delete-button').addEventListener('click', () => {
        allTodos = allTodos.filter(t => t.id !== todo.id);
        saveTodos();
        updateTodoList();
    });

    return todoLI;
}

// Save to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(allTodos));
}
