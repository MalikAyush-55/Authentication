const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");
const Student = require("./student.js");


const schoolSchema = new mongoose.Schema({
  name:{
      type:String,
      required:true,
  },
  student_id:[{
      type:Schema.Types.ObjectId,
      ref:"Student",
  }],
  password:{
      type:String,
      required:true,
  }

});
// static signup method
schoolSchema.statics.signup = async function (username, password) {
  const exists_username = await this.findOne({ username });

  if (!username || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password must have atleat 1 capital, 1 small and 1 unique character"
    );
  }

  if (exists_username) {
    throw Error("An account already exists with this username");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, password: hash });

  return user;
};

schoolSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });

  if (!password || !username) {
    throw Error("All fields must be filled");
  }
  if (!user) {
    throw Error("Username does not exist");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};

const School = new mongoose.model("School", schoolSchema);
module.exports = School;
