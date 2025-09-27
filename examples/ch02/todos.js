// State of the app
const todos = ['Walk the dog', 'Water the plants', 'Sand the chairs']

// HTML element references
const addTodoInput = document.getElementById('todo-input')
const addTodoButton = document.getElementById('add-todo-btn')
const todosList = document.getElementById('todos-list')

// Initialize the view
for (const todo of todos) {
	todosList.append(renderTodoInReadMode(todo))
}

addTodoInput.addEventListener('input', () => {
	addTodoButton.disabled = addTodoInput.value.length < 3
})

addTodoInput.addEventListener('keydown', ({ key }) => {
	if (key === 'Enter' && addTodoInput.value.length >= 3) {
		addTodo()
	}
})

addTodoButton.addEventListener('click', () => {
	addTodo()
})

//Functions
function renderTodoInReadMode(todo) {
	// TODO: implement me!
}

function addTodo() {
	// TODO: implement me!
}
