const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// @route POST /api/todos
// @desc Create a new todo
// @access Public
router.post('/', async (req, res) => {
  const { title } = req.body;
  try {
    const newTodo = new Todo({ title });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route GET /api/todos
// @desc Get all todos
// @access Public
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route PUT /api/todos/:id
// @desc Update a todo
// @access Public
router.put('/:id', async (req, res) => {
  const { title, completed } = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, completed },
      { new: true }
    );
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route DELETE /api/todos/:id
// @desc Delete a todo
// @access Public
router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
