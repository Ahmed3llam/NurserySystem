const {body,query,param}=require("express-validator")

exports.insertChild=[
    // body("_id").isInt().withMessage("id must be an integer"),
    body("fullName").isString().withMessage("Fullname must be a string"),
    body("age").isInt({ min: 1 }).withMessage("Age must be a positive integer"),
    body("level").isIn(["PreKG", "KG1", "KG2"]).withMessage("Invalid level"),
    body("address").isObject().withMessage("address must be object"),
    body("address.city").isString().withMessage("City must be a string"),
    body("address.street").isString().withMessage("Street must be a string"),
    body("address.building").isString().withMessage("Building must be a string")
]
exports.updateChild=[
    body("_id").isInt().withMessage("id must be an integer"),
    body("fullName").optional().isString().withMessage("Fullname must be a string"),
    body("age").optional().isInt({ min: 1 }).withMessage("Age must be a positive integer"),
    body("level").optional().isIn(["PreKG", "KG1", "KG2"]).withMessage("Invalid level"),
    body("address").optional().isObject().withMessage("address must be object"),
    body("address.city").optional().isString().withMessage("City must be a string"),
    body("address.street").optional().isString().withMessage("Street must be a string"),
    body("address.building").optional().isString().withMessage("Building must be a string")
]

exports.pramValid=[
    param("id").isInt().withMessage("id must be an integer"),
]