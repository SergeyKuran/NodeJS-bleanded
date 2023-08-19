const fs = require("fs/promises");
const path = require("path");

const taskPath = path.join(__dirname, "..", "db", "tasks.json");

const getAllTasksService = async () => {
  const jsonData = await fs.readFile(taskPath, "utf-8");

  return JSON.parse(jsonData);
};

const getOneTaskService = async () => {};

const createTaskService = async () => {};

const updateTaskService = async () => {};

const deleteTaskService = async () => {};

module.exports = {
  getAllTasksService,
  getOneTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
};
