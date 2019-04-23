const express = require('express');
const dotEnv = require('dotenv');
const bodyparser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose')

const routes = require('./routes');

dotEnv.config();

const PORT = process.env.PORT || 9999;

const app = express();
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json());
app.use(logger('dev'));

const mongoURL = () => {
  if (process.env.NODE_ENV === "development") {
    return mongoose.connect(process.env.DEV_MONGO_URL, { useNewUrlParser: true })
  }
  if (process.env.NODE_ENV === "testing") {
    return mongoose.connect(process.env.TESTING_MONGO_URL, { useNewUrlParser: true })
  }
  if (process.env.NODE_ENV === "production") {
    return mongoose.connect(process.env.PROD_MONGO_URL, { useNewUrlParser: true })
  }
}

mongoURL();

app.use(routes);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`
--------------------------------------------------
  Server Running on port ${PORT}:    
  Books API is ready on http://localhost:${PORT}
--------------------------------------------------
    `);
});