const {body,query,param}=require("express-validator")

exports.insertTeacher=[
    body("_id").isMongoId().withMessage("id must be an objectid"),
    body("fullname").isString().withMessage("Fullname must be a string"),
    body("password").isString().withMessage("Password must be a string"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("image").isString().withMessage("Image must be a string")
]
exports.updateTeacher=[
    body("_id").isMongoId().withMessage("id must be an objectid"),
    body("fullname").optional().isString().withMessage("Fullname must be a string"),
    body("password").optional().isString().withMessage("Password must be a string"),
    body("email").optional().isEmail().withMessage("Invalid email format"),
    body("image").optional().isString().withMessage("Image must be a string")
]

exports.pramValid=[
    param("id").isMongoId().withMessage("id must be objectid"),
]