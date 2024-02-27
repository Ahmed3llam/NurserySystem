const mongoose=require('mongoose');
const uniqueId = require('generate-unique-id');

const childAddressSchema= new mongoose.Schema({
    city:{
        type:String,

    },
    street:{
        type:String
    },
    building:{
        type:String
    }
},{_id: false})

const childSchema=new mongoose.Schema({
    _id: {
        type: Number,
        default: function () {
            return uniqueId({
                length: 10,
                useLetters: false
            });
        }
    },
    fullName:{
        type:String,
    },
    age:{
        type:Number,
        min: 1
    },
    level:{
        type:String,
        enum:["PreKG", "KG1", "KG2"]
    },
    address:childAddressSchema
})

module.exports=mongoose.model('child',childSchema)