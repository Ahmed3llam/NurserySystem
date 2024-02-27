const schema=require('../Model/class')
const teacherSchema=require('../Model/teacher');
const childSchema=require('../Model/child');
exports.getAllClasses=(req,res,next)=>{
    schema.find({})
    .populate({
        path:'supervisor',
        select:{fullname:1},
    })
    .populate({
        path:'children',
        select:{fullName:1},
    })
    .then((data)=>{
        res.status(200).json({
            data
        })
    }).catch((err)=>{
        next(err); 
    })
}

exports.getClass=(req,res,next)=>{
    schema.findOne({_id:req.params.id})
    .populate({
        path:'supervisor',
        select:{fullname:1},
    })
    .populate({
        path:'children',
        select:{fullName:1},
    })
    .then((object)=>{
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

exports.getClassChildren=(req,res,next)=>{
    schema.findOne({_id:req.params.id})
    .populate({
        path:'children'
    })
    .then((object)=>{
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

exports.getSupervisors=(req,res,next)=>{
    schema.findOne({_id:req.params.id})
    .populate({
        path:'supervisor',
    })
    .then((object)=>{
        if(!object){
            throw new Error('not found');
        }
        res.status(200).json({
            data:object,

        })
    })
    .catch((err)=>{
        next(err);
    })
}

exports.AddClass = (req, res, next) => {
    teacherSchema.findOne({ _id: req.body.supervisor })
        .then(teacher => {
            if (!teacher) {
                throw new Error("Supervisor must be a valid Teacher id");
            }
            return childSchema.find({ _id: { $in: req.body.children } });
        })
        .then(foundChildren => {
            if (foundChildren.length !== req.body.children.length) {
                throw new Error("Children must be valid Child ids");
            }
            const newClass = new schema( req.body);
            return newClass.save();
        })
        .then(result => {
            res.status(200).json({ message: "Class added successfully" });
        })
        .catch(error => {
            next(error);
        });
};
exports.DeleteClass=(req,res,next)=>{
    schema.deleteOne({_id:req.params.id}).then(()=>{
        res.status(200).json({
            data:"Deleted successfully",
        })
    }).catch(err=>{
        next(err);
    })
}

exports.UpdateClass=(req,res,next)=>{
    teacherSchema.findOne({ _id: req.body.supervisor })
        .then(teacher => {
            if (!teacher) {
                throw new Error("Supervisor must be a valid Teacher id");
            }
            return childSchema.find({ _id: { $in: req.body.children } });
        })
        .then(foundChildren => {
            if (foundChildren.length !== req.body.children.length) {
                throw new Error("Children must be valid Child ids");
            }
            return schema.updateOne({_id:req.body._id }, req.body);
        })
        .then(result => {
            res.status(200).json({
                message: "Class updated successfully",
            });
        })
        .catch(error => {
            next(error);
        });
    }
