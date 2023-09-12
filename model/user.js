const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  passwordHash: {
    type: String,
  },
  street: {
    type: String,
    default: "",
  },
  apartment: [
    {
      type: String,
    },
  ],
  city: {
    type: String,
  },
  zip: {
    type: String,
  },
  country: {
    type: String,
  },
  phone: {
    type: Number,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

exports.User = mongoose.model("User", userSchema);
