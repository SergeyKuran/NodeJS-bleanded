const {
  getAllTasksService,
  getOneTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
} = require("../services/taskServices");

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await getAllTasksService();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const getOneTask = async (req, res, next) => {
  try {
    const { taskID } = req.params;
    const task = await getOneTaskService(taskID);

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const newTask = await createTaskService(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { taskID } = req.params;
    const updatedTask = await updateTaskService(taskID, req.body);

    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { taskID } = req.params;
    const deletedTaskId = await deleteTaskService(taskID);

    res.status(200).json({ message: `Task ${deletedTaskId} has been deleted` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTasks,
  getOneTask,
  createTask,
  updateTask,
  deleteTask,
};
