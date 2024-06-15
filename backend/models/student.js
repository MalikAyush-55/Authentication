const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    level:{
        type:Number,
        default:0,
        required:true,
    },
    school:{
        type:String,
        required:true,
    },
    class:{
        type:Number,
        required:true,
    },
})

const Student = new mongoose.model("student", studentSchema);
module.exports = Student;