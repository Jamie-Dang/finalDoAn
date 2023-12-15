const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
    unique: true,
  },

  phone: {
    type: String,
  },

  address: {
    type: String,
  },

  role: {
    type: String,
    enum: ["user", "staff", "admin"],
    default: "user",
  },

  password: {
    type: String,
  },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  this.password = bcrypt.hashSync(this.password, 12);

  next();
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
