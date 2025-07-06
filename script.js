const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-btn');
const removeButtons = document.querySelectorAll('.remove-btn');
const checkboxInputs = document.querySelectorAll('[type="checkbox"]');
const filterAll = document.querySelector('[data-filter="all"]');
const filterDone = document.querySelector('[data-filter="done"]');
const filterTodo = document.querySelector('[data-filter="todo"]');
const checkboxInputContainer = document.getElementById('checkbox-input-container');
const filters = document.querySelectorAll('#filter div');
const wrapper = document.getElementById('wrapper');
const tasksTodo = document.querySelectorAll('.todo');
const tasksArray = Array.from(tasksTodo);
const checkboxArray = Array.from(checkboxInputs);
const sortElement = document.getElementById('sort');
let sortedValue = sortElement.value;



let i = 4;

const todos = JSON.parse(localStorage.getItem('datas')) || [];


if(todos) {
        todos.forEach(todo => {
        createNewTask(todo)
    })
}
/**
 * Creates a new task element and appends it to the todo list UI.
 *
 * @param {string} task - The description of the task to be added.
 *
 * @returns {void}
 *
 * @example
 * createNewTask('Buy groceries');
 *
 * @description
 * This function dynamically creates the necessary DOM elements for a new todo task,
 * including a checkbox, label, description span (for accessibility), and a remove button.
 * It sets appropriate attributes and event handlers, appends the elements to the DOM,
 * and adds the new task container to the tasks array.
 */

function createNewTask(task) {
            const divContainer = document.createElement('div');
            const divChild1 = document.createElement('div');
            const divChild2 = document.createElement('div');
            const input = document.createElement('input');
            const label = document.createElement('label');
            const button = document.createElement('button');
            divContainer.classList.add('done', 'todo');
            input.setAttribute('type', 'checkbox');
            input.setAttribute('name', `todo-${i++}`);
            input.setAttribute('id', `${task.toLowerCase().split(" ").join("-")}-${Date.now()}`);
            input.setAttribute('aria-describedby', `task-${i++}-desc`);
            input.onchange = verifyInputChecked;
            label.setAttribute('for', `${task.toLowerCase().split(" ").join("-")}-${Date.now()}`);
            label.textContent = `${task}`;
            button.classList.add('remove-btn');
            button.onclick = removeTodoFromList;
            button.textContent = "Supprimer";
            divChild1.append(input, label);
            divChild2.append(button);
            divContainer.append(divChild1, divChild2);
            checkboxInputContainer.append(divContainer);
            wrapper.append(checkboxInputContainer);
           tasksArray.push(divContainer);
}


/**
 * Adds a new todo item to the list after validating the input.
 * - Ensures the input is not empty.
 * - Ensures the todo length is between 10 and 100 characters.
 * - If valid, creates a new task, updates the todos array, and saves it to localStorage.
 * - Resets the input field after processing.
 *
 * @param {string} todo - The todo item to add (will be overwritten by the value from todoInput).
 */
const addTodoToList = (todo) => {
    todo = todoInput.value;
    if(todo.trim() === "") {
        alert('Le champ ne doit pas etre laissé vide.');
        return
    }
    else if (todo.length < 10 || todo.length > 100) {
        alert('La longueur de votre tache ne doit pas etre en dessous de 10 ni au dessus de 100 caractères.');
        return
    }
    else {
           createNewTask(todo)
           todos.push(todo)
           localStorage.setItem('datas', JSON.stringify(todos))
    }
    todoInput.value = "";
}


addButton.addEventListener('click', addTodoToList);

document.addEventListener('keypress', (e) => {
   if (e.key === "Enter") {
        addTodoToList()
   }
});

const todosOnStorage = JSON.parse(localStorage.getItem('todos')) || [];

/**
 * Removes a todo item from the DOM and updates the todos array and localStorage.
 * Assumes the function is used as an event handler with `this` bound to the delete button inside a todo item.
 * 
 * Steps:
 * 1. Removes the todo item's parent element from the DOM.
 * 2. Finds the index of the todo in the `todos` array based on the text content.
 * 3. Removes the todo from the `todos` array.
 * 4. Updates the `localStorage` with the new `todos` array.
 *
 * @this {HTMLElement} The delete button inside the todo item.
 */
function removeTodoFromList () {
    this.parentElement.parentElement.remove();
   const index = todos.indexOf(Array.from(this.parentElement.parentElement.firstChild.children).filter(child => child.textContent !== undefined)[1].textContent)
    todos.splice(index, 1);
    todosOnStorage.splice(index, 1);  
    localStorage.setItem('datas', JSON.stringify(todos));
    localStorage.setItem('todos', JSON.stringify(todosOnStorage));
}


removeButtons.forEach(button => {
    button.addEventListener('click', removeTodoFromList) })

    localStorage.removeItem('checkbox')



const activeFilter = localStorage.getItem('active');


if (activeFilter === "filter-done-active") {
    setActive(filterDone);
    tasksArray.forEach(task => {
       todosOnStorage.forEach(todo => {
        if (todo.text === task.firstElementChild.lastElementChild.textContent && todo.done === true) {
            task.firstElementChild.firstElementChild.checked = true;
            task.classList.remove('todo');
        }
        else if(todo.text === task.firstElementChild.lastElementChild.textContent && todo.done === false) {
            task.firstElementChild.firstElementChild.checked = false;
            task.classList.add('todo');
        }
        
       }) 
       if (task.classList.contains('todo') && task.classList.contains('done')) {
            task.style.display = "none";
       }
       if (task.classList.contains('todo') && !task.classList.contains('done')) {
            task.style.display = "none";
       }
    })
}
else if (activeFilter === "filter-todo-active") {
    setActive(filterTodo);
    tasksArray.forEach(task => {
       todosOnStorage.forEach(todo => {
        if (todo.text === task.firstElementChild.lastElementChild.textContent && todo.done === true) {
            task.firstElementChild.firstElementChild.checked = true;
            task.classList.remove('todo');
        }
        else if (todo.text === task.firstElementChild.lastElementChild.textContent && todo.done === false) {
            task.firstElementChild.firstElementChild.checked = false;
            task.classList.add('todo');
        }
        
       }) 
       if (task.classList.contains('todo') && task.classList.contains('done')) {
            task.style.display = "flex";
       }
       if (task.classList.contains('done') && !task.classList.contains('todo')) {
            task.style.display = "none";
       }
    })
}   
else {
    setActive(filterAll);
     tasksArray.forEach(task => {
       todosOnStorage.forEach(todo => {
        if (task.firstElementChild.lastElementChild.textContent === todo.text &&  todo.done === true) {
            task.firstElementChild.firstElementChild.checked = true;
            task.classList.remove('todo')
        }
        else if(task.firstElementChild.lastElementChild.textContent === todo.text && todo.done === false){
            task.firstElementChild.firstElementChild.checked = false;
            task.classList.add('todo')
        }
       })
    })

} 


/**
 * Handles the change event for a todo item's checkbox.
 * Updates the parent element's CSS classes based on the checkbox state,
 * updates the todosOnStorage array with the current todo's state,
 * and persists the updated todos list to localStorage.
 *
 * @this {HTMLInputElement} The checkbox input element triggering the event.
 */
function verifyInputChecked() {
    if (this.checked) {
           this.parentElement.parentElement.classList.add('done');
           this.parentElement.parentElement.classList.remove('todo');
           
        }
        else {
            this.parentElement.parentElement.classList.add('todo');
            this.parentElement.parentElement.classList.remove('done');
            console.log(this.id)
        }
        todosOnStorage.push({
            "id": this.id,
            "text": this.parentElement.lastElementChild.textContent,
            "done": this.checked
        })
       localStorage.setItem('todos', JSON.stringify(todosOnStorage))
}
checkboxInputs.forEach(checkbox => {
checkbox.addEventListener('change', verifyInputChecked)})

/**
 * Filters the displayed todo items based on the selected filter ("done", "todo", or "all").
 * Updates the display style of each todo item in the tasksArray according to its status.
 * Also updates the localStorage to remember the active filter and sets the active filter button.
 *
 * @param {Event} e - The event object from the filter button click, used to determine the selected filter.
 */
const filterTodos = (e) => {
    if (e.currentTarget.getAttribute('data-filter') === "done") {
            tasksArray.forEach(todo => {
                if (todo.classList.contains('done') && !todo.classList.contains('todo')) {
                    todo.style.display = "flex";     

                } else if(todo.classList.contains('todo') && !todo.classList.contains('done')){
                    todo.style.display = "none";
                }  
                else  {
                    todo.style.display = "none";
                } 
            });
            localStorage.setItem('active', 'filter-done-active');
            setActive(filterDone)
        }
        else if(e.currentTarget.getAttribute('data-filter') === "todo"){
            tasksArray.forEach(todo => {
                if (todo.classList.contains('done') && !todo.classList.contains('todo')) {
                    todo.style.display = "none";
                } else if(todo.classList.contains('todo') && !todo.classList.contains('done')){
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "flex";
                }
              
            });
             localStorage.setItem('active', 'filter-todo-active');
            setActive(filterTodo)

        }
        else {
             tasksArray.forEach(todo => {
                if (todo.classList.contains('done') && !todo.classList.contains('todo')) {
                    todo.style.display = "flex";
                } else if(todo.classList.contains('todo') && !todo.classList.contains('done')){
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "flex";
                }
            });
             localStorage.setItem('active', 'filter-all-active');
            setActive(filterAll);
            
        }
        
}



filters.forEach(filter => {
    filter.addEventListener('click', filterTodos)})


/**
 * Sets the 'active' class on the currently selected filter element and removes it from all others.
 *
 * @param {HTMLElement} currentFilter - The filter element to be marked as active.
 */
function setActive(currentFilter) {
    filters.forEach(filter => {
        filter.classList.remove('active');
        currentFilter.classList.add('active');
    })
}


sortElement.addEventListener('change', function() {
    sortedValue = this.value;
    sortTodos()
});

/**
 * Clears all todo items from the DOM and empties the tasks array.
 *
 * This function removes all child elements from the checkbox input container
 * and resets the tasksArray to an empty state.
 *
 * @function
 * @returns {void}
 */
const clearTodosFromDOM = () => {
  checkboxInputContainer.innerHTML = "";
  tasksArray.length = 0;
}
let j = 4;
/**
 * Renders a single todo item as a DOM element and appends it to the todo list.
 *
 * @param {Object} todo - The todo item to render.
 * @param {number|string} todo.id - The unique identifier for the todo item.
 * @param {string} todo.text - The text description of the todo item.
 * @param {boolean} todo.complete - Whether the todo item is marked as complete.
 *
 * @returns {void}
 */
const renderTodo = (todo) => {
            const divContainer = document.createElement('div');
            const divChild1 = document.createElement('div');
            const divChild2 = document.createElement('div');
            const input = document.createElement('input');
            const label = document.createElement('label');
            const button = document.createElement('button');
            input.setAttribute('type', 'checkbox');
            input.setAttribute('name', `todo-${j++}`);
            input.setAttribute('id', `${todo.id}`);
            input.setAttribute('aria-describedby', `task-${j++}-desc`);
            input.checked = todo.complete;
            if (input.checked) {
                divContainer.classList.add('done');
            }
            input.onchange = verifyInputChecked;
            label.setAttribute('for', `${todo.id}`);
            label.textContent = `${todo.text}`;
            button.classList.add('remove-btn');
            button.onclick = removeTodoFromList;
            button.textContent = "Supprimer";
            divChild1.append(input, label);
            divChild2.append(button);
            divContainer.append(divChild1, divChild2);
            checkboxInputContainer.append(divContainer);
            wrapper.append(checkboxInputContainer);
           tasksArray.push(divContainer);
}

/**
 * Sorts the tasksArray by the text property of each task in ascending (A-Z) order
 * using French locale, then clears the current todos from the DOM and renders the sorted todos.
 *
 * Assumes the existence of:
 * - tasksArray: an array-like collection of task DOM elements.
 * - clearTodosFromDOM: a function to remove all todos from the DOM.
 * - renderTodo: a function to render a todo object to the DOM.
 */
const sortByAscendantOrder = () => {
    const todosArray = [];
    for (const task of tasksArray) {
       todosArray.push({
          id: task.firstElementChild.firstElementChild.id,
          text : task.firstElementChild.lastElementChild.textContent.trim(),
          complete : task.firstElementChild.firstElementChild.checked
       })
    }
   
    const sortedTodos = todosArray.slice().sort((a, b) => 
        a.text.localeCompare(b.text, "fr")
    );

    clearTodosFromDOM();
    sortedTodos.forEach(renderTodo);
}

/**
 * Sorts the tasksArray by the text property of each task in descending (Z-A) order
 * using French locale, then clears the current todos from the DOM and renders the sorted todos.
 *
 * Assumes the existence of:
 * - tasksArray: an array-like collection of task DOM elements.
 * - clearTodosFromDOM: a function to remove all todos from the DOM.
 * - renderTodo: a function to render a todo object to the DOM.
 */
const sortByDescendantOrder = () => {
    const todosArray = [];
    for (const task of tasksArray) {
       todosArray.push({
          id: task.firstElementChild.firstElementChild.id,
          text : task.firstElementChild.lastElementChild.textContent.trim(),
          complete : task.firstElementChild.firstElementChild.checked
       })
    }
   
    const sortedTodos = todosArray.slice().sort((a, b) => 
        b.text.localeCompare(a.text, "fr")
    );
   console.log(sortedTodos)
    clearTodosFromDOM();
    sortedTodos.forEach(renderTodo);
}

/**
 * Sorts the tasks by their completion status (incomplete first, complete last),
 * clears the current tasks from the DOM, and re-renders them in the sorted order.
 *
 * Assumes the existence of a global `tasksArray` containing task DOM elements,
 * as well as `clearTodosFromDOM` and `renderTodo` functions for DOM manipulation.
 */
const sortByStatus = () => {
    const todosArray = [];
    for (const task of tasksArray) {
       todosArray.push({
          id: task.firstElementChild.firstElementChild.id,
          text : task.firstElementChild.lastElementChild.textContent.trim(),
          complete : task.firstElementChild.firstElementChild.checked
       })
    }
   
    const sortedTodos = todosArray.slice().sort((a, b) => {
        return a.complete - b.complete
        }     
    );
   
    clearTodosFromDOM();
    sortedTodos.forEach(renderTodo);
}


/**
 * Sorts the todo list based on the selected sorting value.
 * 
 * Depending on the value of `sortedValue`, this function will:
 * - Sort todos in ascending alphabetical order ("alpha-asc")
 * - Sort todos in descending alphabetical order ("alpha-desc")
 * - Sort todos by their status (default case)
 *
 * Relies on the helper functions: `sortByAscendantOrder`, `sortByDescendantOrder`, and `sortByStatus`.
 *
 * @function
 * @returns {void}
 */
const sortTodos = () => {
    switch (sortedValue) {
        case "alpha-asc":
            sortByAscendantOrder()
            break;
        case "alpha-desc":
            sortByDescendantOrder()
            break;
        default:
            sortByStatus()
            break;
    }
}









