const Task = require('../models/task');
const HttpError = require('../utils/HttpError');

const getAllTasksService = async () => {
  return await Task.find();
};

const getOneTaskService = async (taskId) => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new HttpError(404);
  }

  return task;
};

const createTaskService = async (body) => {
  return await Task.create(body);
};

const updateTaskService = async (taskId, body) => {
  const updetedTask = await Task.findByIdAndUpdate(taskId, body, { new: true });
  if (!updetedTask) {
    throw new Error('This task does not exist');
  }
  return updetedTask;
};

const deleteTaskService = async (taskId) => {
  const deletedTask = await Task.findByIdAndRemove(taskId);
  if (!deletedTask) {
    throw new Error('This task does not exist');
  }
  return deletedTask;
};

module.exports = {
  getAllTasksService,
  getOneTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
};
