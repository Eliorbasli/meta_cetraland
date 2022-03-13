const mongoose = require("mongoose");

const landSchema = new mongoose.Schema({
  ownerId: {
    type: String,
    default: "0",
  },
  type: {
    type: String, //Road, park, land
    required: true,
  },
  cost: {
    type: Number,
    default: 50,
  },
  game: {
    type: String,
    default: "",
  },
  isForSale: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Land", landSchema);
