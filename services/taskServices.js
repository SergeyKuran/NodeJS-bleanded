const fs = require("fs/promises");
const path = require("path");
const {randomUUID} = require('node:crypto')

const taskPath = path.join(__dirname, "..", "db", "tasks.json");

const getAllTasksService = async () => {
  const jsonData = await fs.readFile(taskPath, "utf-8");

  return JSON.parse(jsonData);
};

const getOneTaskService = async (taskId) => {
  const tasks = await getAllTasksService()
  const task = tasks.find(({ id }) => taskId === id);
  if (!task) {
    throw new Error("This task does not exist")
  }

  return task;
};

const createTaskService = async (body) => {
  const tasks = await getAllTasksService();
  const newTask = { ...body, id: randomUUID() };
  tasks.push(newTask);

  await fs.writeFile(taskPath, JSON.stringify(tasks, null, 2));

  return newTask;
};

const updateTaskService = async (taskId, body) => {
  const tasks = await getAllTasksService();
  const taskIndex = tasks.findIndex(({ id }) => taskId === id);
  if (taskIndex === -1) {
     throw new Error("This task does not exist");
  }

  tasks[taskIndex] = { ...tasks[taskIndex], ...body };
  await fs.writeFile(taskPath, JSON.stringify(tasks, null, 2));

  return tasks[taskIndex];
};

const deleteTaskService = async (taskId) => {
  const tasks = await getAllTasksService();
  const taskIndex = tasks.findIndex(({ id }) => taskId === id);
  if (taskIndex === -1) {
    throw new Error("This task does not exist");
  }

  tasks.splice(taskIndex, 1);
  await fs.writeFile(taskPath, JSON.stringify(tasks, null, 2));

  return taskId;
};

module.exports = {
  getAllTasksService,
  getOneTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
};
