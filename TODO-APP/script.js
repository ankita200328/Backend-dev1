let todos = [];

// New todo
function addTodo(id, title, description) {
    const todo = {
        id: id,
        title: title,
        description: description,
        status: "Pending" // default status
    };
    todos.push(todo);
    console.log("Todo added successfully!");
}

// Read and display all todos
function displayTodos() {
    if (todos.length === 0) {
        console.log("No todos available.");
        return;
    }
    todos.forEach(todo => {
        console.log(`ID: ${todo.id}, Title: ${todo.title}, Description: ${todo.description}, Status: ${todo.status}`);
    });
}

// Update a todo
function updateTodo(id, newTitle, newDescription) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        if (newTitle) todo.title = newTitle;
        if (newDescription) todo.description = newDescription;
        console.log("Todo updated successfully!");
    } else {
        console.log("Todo not found!");
    }
}

// Mark a todo as completed
function markCompleted(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.status = "Completed";
        console.log("Todo marked as completed!");
    } else {
        console.log("Todo not found!");
    }
}

// Delete a todo
function deleteTodo(id) {
    const index = todos.findIndex(t => t.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
        console.log("Todo deleted successfully!");
    } else {
        console.log("Todo not found!");
    }
}

// Using CRUD operations
addTodo(1, "Buy groceries", "Milk, Bread, Eggs");
addTodo(2, "Study", "Finish JavaScript assignment");

console.log("\nAll Todos:");
displayTodos();

updateTodo(1, "Buy groceries and fruits", null);
markCompleted(2);

console.log("\nAfter Updates:");
displayTodos();

deleteTodo(1);

console.log("\nAfter Deletion:");
displayTodos();
