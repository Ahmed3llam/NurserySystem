const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
const teacherSchema=new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    fullname:{
        type:String,
    },
    email:{
        type:String,
        match: emailRegex
    },
    password:{
        type:String,
    },
    image:{
        type:String
    },
})
teacherSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            this.password = await bcrypt.hash(this.password, salt);
        } catch (error) {
            return next(error);
        }
    }
    next();

});
module.exports=mongoose.model('teacher',teacherSchema)