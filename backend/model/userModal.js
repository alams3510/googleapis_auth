const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  image: {
    type: String,
  },
});

const UserModal = mongoose.model("google-auth", UserSchema);

module.exports = UserModal;
