require('dotenv').config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI)
const userSchema = new mongoose.Schema(
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
      require: false,
    },
    birthDate: {
      type: Date,
      require: false,
    },
  },
  {
    versionKey: false,
    strict: false,
  }
);

const user = mongoose.model("user", userSchema);
module.exports.user = user