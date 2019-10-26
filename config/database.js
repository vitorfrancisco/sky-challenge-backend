require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`);
mongoose.Promise = global.Promise;


module.exports = mongoose;
