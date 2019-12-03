const mongoose = require('mongoose');

const { DB_ADDRESS } = process.env;

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
