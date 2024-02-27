const {validationResult} =require("express-validator")
module.exports=(req,res,next)=>{
    let result=validationResult(req);
    if(result.errors.length>0){
        let msgs=result.errors.reduce((current,obj)=>current+obj.msg+" "," ")
        let error=new Error(msgs)
        error.status=400
        next(error)
    }
    else{
        next()
    }
}