const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    role: {
      type: String,
      require: true,
    },
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
  },
  {
    versionKey: false,
    strict: false,
  }
);

const user = mongoose.model("user", userSchema);
module.exports = user;