const schemaTeacher=require('../Model/teacher')
const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.LogIn=async(req,res,next)=>{
    try {
        if(req.body.email=="admin@gmail.com" && req.body.password=="1234"){
            let token = jwt.sign({
                email: req.body.email,
                password: req.body.password,
                role: "admin",
            }, 
            process.env.key, 
            { expiresIn: "2h" });
            res.status(200).json({
                data: token
            });
        }
        else{
            let data = await schemaTeacher.findOne({ email: req.body.email});
            let PassCheck = await bcrypt.compare(req.body.password, data.password);
            if (!data || !PassCheck) {
                throw new Error("Invalid email or password");
            } else {
            let token = jwt.sign({
                _id: data._id,
                fullname: data.fullname,
                email: data.email,
                password: data.password,
                image: data.image,
                role: "teacher",
            }, process.env.key, { expiresIn: "2h" });
                res.status(200).json({
                    data: token
                });
            }
        }
    } catch (err) {
        next(err);
    }
}