// state
// const todos = ['Walk the dog', 'Water the plants', 'Sand the chairs']

const todos = [
	{ description: 'take vitamins', done: false },
	{ description: 'do dishes', done: false },
	{ description: 'check email', done: false },
]

// grab the elements
const addTodoInput = document.getElementById('todo-input')
const addTodoButton = document.getElementById('add-todo-btn')
const todosList = document.getElementById('todos-list')

// init view
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

// funcs
function renderTodoInReadMode(todo) {
	const li = document.createElement('li')

	const span = document.createElement('span')
	span.textContent = todo.description

	if (todo.done) {
		span.classList.add('done')
	}
	if (!todo.done) {
		span.addEventListener('dblclick', () => {
			const idx = todos.indexOf(todo)

			todosList.replaceChild(
				renderTodoInEditMode(todo),
				todosList.childNodes[idx]
			)
		})
	}
	li.append(span)

	if (!todo.done) {
		const button = document.createElement('button')
		button.textContent = 'Done'
		button.addEventListener('click', () => {
			const idx = todos.indexOf(todo)
			removeTodo(idx)
		})
		li.append(button)
	}
	return li
}

function renderTodoInEditMode(todo) {
	const li = document.createElement('li')

	const input = document.createElement('input')
	input.type = 'text'
	input.value = todo.description
	li.append(input)

	const saveBtn = document.createElement('button')
	saveBtn.textContent = 'Save'
	saveBtn.addEventListener('click', () => {
		const idx = todos.indexOf(todo)
		updateTodo(idx, input.value)
	})
	li.append(saveBtn)

	const cancelBtn = document.createElement('button')
	cancelBtn.textContent = 'Cancel'
	cancelBtn.addEventListener('click', () => {
		const idx = todos.indexOf(todo)
		todosList.replaceChild(
			renderTodoInReadMode(todo),
			todosList.childNodes[idx]
		)
	})
	li.append(cancelBtn)
	return li
}

function updateTodo(index, description) {
	todos[index].description = description
	todos[index].done = false
	const todo = renderTodoInReadMode(todos[index])
	todosList.replaceChild(todo, todosList.childNodes[index])
}

function removeTodo(index) {
	todos[index].done = true
	todosList.replaceChild(
		renderTodoInReadMode(todos[index]),
		todosList.childNodes[index]
	);
}

function addTodo() {
	const description = addTodoInput.value

	if (todoExists(description)) {
		alert('Todo already exists')
		return
	}
	const newTodo = { description: description, done: false }
	todos.push(newTodo)
	const todo = renderTodoInReadMode(newTodo)
	todosList.append(todo)

	addTodoInput.value = ''
	addTodoButton.disabled = true

	readTodo(description)
}

function todoExists(description) {
	const cleanTodos = todos.map((todo) => todo.description.trim().toLowerCase())
	return cleanTodos.includes(description.trim().toLowerCase())
}

function readTodo(description) {
	const message = new SpeechSynthesisUtterance();
	message.text = description
	message.voice = speechSynthesis.getVoices()[0]
	speechSynthesis.speak(message)
}
