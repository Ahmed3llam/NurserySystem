const {body,query,param}=require("express-validator")
const teacherSchema = require("../../Model/teacher")
const childSchema = require("../../Model/child")

exports.insertClass=[
    // body("_id").isInt().withMessage("id must be an integer"),
    body("name").isString().withMessage("Name must be a string"),
    body("supervisor").isMongoId().withMessage("Supervisor must be a valid number of Teacher id"),
    body("children").isArray().withMessage("Children must be an array of ids"),
    body("children.*").isInt().withMessage("Children must be a valid number of Child id"),
]
exports.updateClass=[
    body("_id").isInt().withMessage("id must be an integer"),
    body("name").optional().isString().withMessage("Name must be a string"),
    body("supervisor").optional().isMongoId().withMessage("Supervisor must be a valid number of Teacher id"),
    body("children").optional().isArray().withMessage("Children must be an array of ids"),
    body("children.*").isInt().withMessage("Children must be a valid number of Child id"),
]
exports.pramValid=[
    param("id").isInt().withMessage("id must be an integer"),
]