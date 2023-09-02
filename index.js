require('dotenv').config();
const connectDb = require('./db/connectDb');
const app = require('./app');

const { PORT, DB_URI } = process.env;


(async () => {
  await connectDb(DB_URI);
  console.log(`Database connection was successfully established`)
  app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
  });
})();
