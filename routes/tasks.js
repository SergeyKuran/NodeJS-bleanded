const { Router } = require("express");

const {
  getAllTasks,
  getOneTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskControllers");

const router = Router();

router.route("/").get(getAllTasks).post(createTask);
router.route("/:taskID").get(getOneTask).patch(updateTask).delete(deleteTask);

module.exports = { tasksRouter: router };
