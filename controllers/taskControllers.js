const {
  getAllTasksService,
  getOneTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
} = require('../services/taskServices');
const controllerWrapper = require('../utils/controllerWrapper');

const getAllTasks = controllerWrapper(async (req, res, next) => {
  const userId = req.user._id;
  const tasks = await getAllTasksService(userId);
  res.json(tasks);
});

const getOneTask = controllerWrapper(async (req, res, next) => {
  const userId = req.user._id;
  const { taskID } = req.params;
  const task = await getOneTaskService(taskID, userId);

  res.status(200).json(task);
});

const createTask = controllerWrapper(async (req, res, next) => {
  const userId = req.user._id;
  const newTask = await createTaskService(req.body, userId);
  res.status(201).json(newTask);
});

const updateTask = controllerWrapper(async (req, res, next) => {
  const { taskID } = req.params;
  const userId = req.user._id;
  const updatedTask = await updateTaskService(taskID, req.body, userId);

  res.status(200).json(updatedTask);
});

const deleteTask = controllerWrapper(async (req, res, next) => {
  const { taskID } = req.params;
  const userId = req.user._id;
  const deletedTask = await deleteTaskService(taskID, userId);

  res.status(200).json(deletedTask);
});

// let createTask = () => {};
// createTask = controllerWrapper(createTask);

module.exports = {
  getAllTasks,
  getOneTask,
  createTask,
  updateTask,
  deleteTask,
};
