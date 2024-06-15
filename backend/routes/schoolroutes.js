const express = require("express");
const router = express.Router();
const {getStudents, getStudent} = require("../controllers/getStudents");

router.get("/get-students", getStudents);
router.get("/get-student/:id", getStudent);

module.exports = router;