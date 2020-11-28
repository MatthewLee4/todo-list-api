var express = require('express');
const port = 3000;
var bodyParser = require('body-parser');
let primaryId = 1;
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var todoList = [
    {
        id: primaryId,
        todo: "Implement a REST API"
    }
];

// GET /api/todos
app.get('/api/todos', (req, res) => {
    res.send(todoList);
});

// GET /api/todos/:id
app.get('/api/todos/:id', (req, res) => {
    const id = req.params.id;
    let todoListId = todoList.find((todoListId) => {
        return todoListId.id === Number(id)
    });
    res.status(200).send(todoListId);
});

// POST /api/todos
app.post('/api/todos', (req, res) => {
    todoList.push({
        id: primaryId,
        todo: req.body.todo
    });
    primaryId++;

    res.status(200).json({
        message: "Order created succesfully"
    })
});

// PUT /api/todos/:id
app.put('/api/todos/:id', (req, res) => {
    const id = req.params.id;
    // Find the index of the order with the given id
    let todoListId = todoList.findIndex((todoListId) => {
        return todoListId.id === Number(id)
    });
    // Update the todoList array by targeting the todoList index
    // set it equal to the request body
    todoList[todoListId] = req.body
    // return the updated todoList
    res.send(todoListId[todoListId]);

});

// DELETE /api/todos/:id
app.delete('/api/todos/:id', (req, res) => {
    const id = req.params.id;

    let todoListId = todoList.find((todoListId) => {
        return todoListId.id === Number(id)
    });

    let todosIndex = todoList.findIndex((i) => {
        return i === todoListId;
    })

    if (todosIndex > -1) {
        todoList.splice(todosIndex, 1);
    }
    res.status(200).send(todoList);
})

app.listen(3000, function(){
    console.log('Todo List API is now listening on port 3000...');
})