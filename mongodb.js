const mongoose = require('mongoose');
const { mongoAddress } = require('./config');

const { NODE_ENV, DB_ADDRESS } = process.env;
mongoose.connect(NODE_ENV === 'develop' ? mongoAddress : DB_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
