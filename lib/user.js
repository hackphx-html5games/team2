var mongoose = require('mongoose');
var Schema = mongoose.Schema;


module.exports = new Schema({
  provider: String,
  uid: String,
  name: String,
  image: String,
  created: {type: Date, default: Date.now}
});

