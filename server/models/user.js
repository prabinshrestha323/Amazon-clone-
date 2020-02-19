const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcrypt-nodejs");
const crypto = require("crypto");

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  name: String,
  password: String,
  pictur: String,
  isSeller: {
    type: Boolean,
    default: false
  },
  address: {
    addr1: String,
    addr2: String,
    state: String,
    country: String,
    postalCode: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});
// hash garxa password yasle chai
UserSchema.pre("save", function(next) {
  var user = this;
  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

// compare garaxa password // user type in and database
UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

//yo chai pic automatic avatar maa basna ko lai // profile maa
UserSchema.methods.gravatar = function(size) {
  if (!this.size) size = 200;
  if (!this.email) {
    return "https://gravatar.com/avatar/?s" + size + "&d=retro";
  } else {
    var md5 = crypto
      .createHash("md5")
      .update(this.email)
      .digest("hex");
    return "https://gravatar.com/avatar/" + md5 + "?s" + size + "&d=retro";
  }
};

module.exports = mongoose.model("User", UserSchema);
