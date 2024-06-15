const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const signupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  NGO_ID: {
    type:Number,
    required:true,
    unique:true,
    min:10,
  },
  password: {
    type: String,
    required: true,
  },
});

// static signup method
signupSchema.statics.signup = async function (name, NGO_ID, password) {
  const exists_email = await this.findOne({ email });

  if (!name || !NGO_ID|| !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password must have atleat 1 capital, 1 small and 1 unique character"
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const NGO = await this.create({ name, NGO_ID, password: hash });

  return NGO;
};

signupSchema.statics.login = async function (name, password) {
  const NGO = await this.findOne({ name });

  if (!password || !name) {
    throw Error("All fields must be filled");
  }
  if (!NGO) {
    throw Error("NGO does not exist");
  }

  const match = await bcrypt.compare(password, NGO.password);
  if (!match) {
    throw Error("Incorrect password");
  }
  return NGO;
};

const NGO= new mongoose.model("NGO", signupSchema);
module.exports = NGO;