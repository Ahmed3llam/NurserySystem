const mongoose=require('mongoose');
const uniqueId = require('generate-unique-id');

const clasSchema=new mongoose.Schema({
    _id: {
        type: Number,
        default: function () {
            return uniqueId({
                length: 10,
                useLetters: false
            });
        }
    },
    name:{
        type:String,
    },
    supervisor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"teacher"
    },
    children:{
        type:[Number],
        ref:"child"

    }
})

module.exports=mongoose.model('class',clasSchema)