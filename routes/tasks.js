const { Router } = require('express');
const validateBody = require('../utils/validateBody');
const {
  createTaskValidationSchema,
  updateTaskValidationSchema,
} = require('../utils/validation//taskValidationSchemas');
const auth = require('../middlewares/auth');

const { getAllTasks, getOneTask, createTask, updateTask, deleteTask } = require('../controllers/taskControllers');

const router = Router();

router.use(auth);

router.route('/').get(getAllTasks).post(validateBody(createTaskValidationSchema), createTask);
router.route('/:taskID').get(getOneTask).patch(validateBody(updateTaskValidationSchema), updateTask).delete(deleteTask);

module.exports = { tasksRouter: router };
