const globalErrorHandler = require('./middlewares/globalErrorHandler')
const notFoundHandler = require('./middlewares/notFoundHandler')

const express = require("express");
const { tasksRouter } = require("./routes/tasks");

const app = express();

app.use(express.json());

app.use("/tasks", tasksRouter);

app.use(notFoundHandler);
app.use(globalErrorHandler);
// Аналог дефолтного експорту
module.exports = app;
