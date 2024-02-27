const schema=require('../Model/child')

exports.getAllChilds=(req,res,next)=>{
    schema.find({}).then((data)=>{
        res.status(200).json({
            data
        })
    }).catch((err)=>{
        next(err); 
    })
}

exports.getChild=(req,res,next)=>{
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

exports.AddChild=(req,res,next)=>{
    const obj=new schema(req.body);
    obj.save().then(()=>{
        res.status(200).json({
            data:"added successfully",
        })
    }).catch((err)=>{
        next(err);
    })
}
exports.DeleteChild=(req,res,next)=>{
    schema.deleteOne({_id:req.params.id}).then(()=>{
        res.status(200).json({
            data:"Deleted successfully",
        })
    }).catch(err=>{
        next(err);
    })
}
exports.UpdateChild=(req,res,next)=>{
    schema.updateOne({_id:req.body._id},req.body).then(()=>{
        res.status(200).json({
            data:"Updated successfully",
        })
    }).catch(err=>{
        next(err);
    })
}