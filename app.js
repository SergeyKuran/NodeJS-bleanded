const express = require("express");
const { tasksRouter } = require("./routes/tasks");

const app = express();

app.use("/tasks", tasksRouter);

// Аналог дефолтного експорту
module.exports = app;
