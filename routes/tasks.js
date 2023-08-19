const { Router } = require("express");

const {
  getAllTasks,
  getOneTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskControllers");

const router = Router();

router.get("/", getAllTasks);
router.get("/:taskID", getOneTask);
router.post("/", createTask);
router.patch("/:taskID", updateTask);
router.delete("/:taskID", deleteTask);

module.exports = { tasksRouter: router };
