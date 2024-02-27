const schema=require('../Model/teacher')
const classschema=require('../Model/class')
exports.getAllTeachers=(req,res,next)=>{
    schema.find({}).then((data)=>{
        res.status(200).json({
            data
        })
    }).catch((err)=>{
        next(err); 
    })
}

exports.getTeacherByID=(req,res,next)=>{
    schema.findOne({_id:req.params.id}).then((object)=>{
        if(!object){
            throw new Error('not found');
        }
        res.status(200).json({
            object
        })
    }).catch((err)=>{
        next(err);
    })
}

exports.getTeacherSupervisors=(req,res,next)=>{
    classschema.find({supervisor:{$exists:true}}).then((object)=>{
        
        res.status(200).json({
            object
        })
    }).catch((err)=>{
        next(err);
    })
}
exports.AddTeacher=(req,res,next)=>{
    const obj=new schema(req.body);
    obj.save().then(()=>{
        res.status(200).json({
            data:"added successfully",
        })
    }).catch((err)=>{
        next(err);
    })
}
exports.UpdateTeacher=(req,res,next)=>{
    schema.updateOne({_id:req.body._id},req.body).then(()=>{
        res.status(200).json({
            data:"Updated successfully",
        })
    }).catch(err=>{
        next(err);
    })
}
exports.DeleteTeacher=(req,res,next)=>{
    schema.deleteOne({_id:req.params.id}).then(()=>{
        res.status(200).json({
            data:"Deleted successfully",
        })
    }).catch(err=>{
        next(err);
    })
}