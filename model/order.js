const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  product: {
    type: String,
    require: true,
  },
  quantity: {
    type: Number,
  },
});

exports.Order = mongoose.model("Order", orderSchema);
