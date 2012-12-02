var mongoose = require('mongoose');
var Schema = mongoose.Schema;


module.exports = new Schema({
  provider: String,
  uid: String,
  name: String,
  image: String,
  created: { type: Date, default: Date.now },
  kills: { type: Number, default: 0 },
  xp: { type: Number, default: 0 },
  stats: {
    acceleration: { type: Number, default: 1 },
    topSpeed: { type: Number, defualt: 100 },
    energy: { type: Number, default: 49 },
    bulletPower: { type: Number, default: 1 },
  }
});

