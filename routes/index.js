const { Router } = require('express');

const { tasksRouter } = require('./tasks');
const { authRouter } = require('./auth');

const router = Router();

router.use('/tasks', tasksRouter);
router.use('/auth', authRouter);

module.exports = router;
