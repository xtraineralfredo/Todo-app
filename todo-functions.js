//Read exisiting todos from local storage
const getSavedTodos = function () {
    const todosJSON = localStorage.getItem('todos')

    if (todosJSON != null) {
        return JSON.parse(todosJSON)
    }
    else {
        return []
    }
}

//Save todos
const saveTodos = function (todos) {
    return localStorage.setItem('todos', JSON.stringify(todos))
}

//Remove a todo
const removeTodo = function (id) {
    const todoIndex = todos.findIndex(function (todo) {
        return todos.id === id
    })
    if (todoIndex > -1) {
        todos.splice('todoIndex', 1)
    }
}

//Toggle the completed value for a given todo
const toggleTodo = function (id) {
    const todo = todos.find(function (todo) {
        return todo.id === id
    })

    if (todo !== undefined) {
        todo.completed = !todo.completed
    }
}

//Render todos
const renderTodos = function (todos, filters) {
    const filteredTodos = todos.filter(function (todo) {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch
    })
    const incompleteTodos = filteredTodos.filter(function (todo) {
        return !todo.completed
    })

    document.querySelector('#todos').innerHTML = ''
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos))
    filteredTodos.forEach(function (todo) {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })
}

//Generate todo DOM
const generateTodoDOM = function (todo) {
    const todoEl = document.createElement('div')
    const textEl = document.createElement('span')
    const checkBox = document.createElement('input')
    const button = document.createElement('button')

    //Setup checkbox
    checkBox.setAttribute('type', 'checkbox')
    checkBox.checked = todo.completed
    todoEl.appendChild(checkBox)
    checkBox.addEventListener('change', function() {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    //Setup todo text
    textEl.textContent = todo.text
    todoEl.appendChild(textEl)

    //Setup delete button
    button.textContent = 'Delete'
    button.addEventListener('click', function (e) {
        removeTodo(todos.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    todoEl.appendChild(button)

    return todoEl
}

//Generate summary DOM
const generateSummaryDOM = function (incompleteTodos) {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    return summary}