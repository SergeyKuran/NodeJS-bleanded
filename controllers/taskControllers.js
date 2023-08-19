const {
  getAllTasksService,
  getOneTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
} = require("../services/taskServices");

const getAllTasks = async (req, res, next) => {
  const tasks = await getAllTasksService();
  res.json(tasks);
};

const getOneTask = (req, res, next) => {};

const createTask = (req, res, next) => {};

const updateTask = (req, res, next) => {};

const deleteTask = (req, res, next) => {};

module.exports = {
  getAllTasks,
  getOneTask,
  createTask,
  updateTask,
  deleteTask,
};
