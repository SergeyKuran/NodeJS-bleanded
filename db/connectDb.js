const { connect } = require("mongoose");

const defaultOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDb = (uri, options = defaultOptions) => {
  return connect(uri, Object.assign(defaultOptions, options));
};

module.exports = connectDb;
