// server.js
const express = require('express');
const cors = require('cors'); 

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

let tasks = [];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const task = { ...req.body }; 
  tasks.push(task);
  res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const updatedTask = req.body;
  tasks = tasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task));
  res.json(tasks.find(task => task.id === id));
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(task => task.id !== id);
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
