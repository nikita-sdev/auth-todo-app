const express= require('express');
const {authMiddleware} = require('../midlleware/auth');
const todoController = require('../controller/todoController');

console.log("todoController:", todoController);
const router= express.Router();

router.get("/todos",authMiddleware, todoController.getTodo);
router.post("/add-task",authMiddleware, todoController.postTodo);
router.delete("/:id",authMiddleware, todoController.deleteTodo);
router.put("/:id",authMiddleware, todoController.updateTodo);

module.exports = router;