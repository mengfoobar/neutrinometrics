const config= require("config")
const mongoose = require('mongoose');
mongoose.Promise=require('bluebird');

mongoose.connect(config.get("db.mongo.connectionStr"), config.get("db.mongo.options"))

module.exports = mongoose;