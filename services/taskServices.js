const Task = require('../models/task');
const HttpError = require('../utils/HttpError');

const getAllTasksService = async (userId) => {
  return await Task.find({ owner: userId });
};

const getOneTaskService = async (taskId, userId) => {
  const task = await Task.findOne({ _id: taskId, owner: userId });
  if (!task) {
    throw new HttpError(404);
  }

  return task;
};

const createTaskService = async (body, userId) => {
  return await Task.create({ ...body, owner: userId });
};

const updateTaskService = async (taskId, body, userId) => {
  const updetedTask = await Task.findByIdAndUpdate({ _id: taskId, owner: userId }, body, { new: true });
  if (!updetedTask) {
    throw new Error('This task does not exist');
  }
  return updetedTask;
};

const deleteTaskService = async (taskId, userId) => {
  const deletedTask = await Task.findByIdAndRemove({ _id: taskId, owner: userId });
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
