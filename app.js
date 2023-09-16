const globalErrorHandler = require('./middlewares/globalErrorHandler');
const notFoundHandler = require('./middlewares/notFoundHandler');

const express = require('express');

const router = require('./routes');

const app = express();

app.use(express.json());

app.use(router);

app.use(notFoundHandler);
app.use(globalErrorHandler);
// Аналог дефолтного експорту
module.exports = app;
