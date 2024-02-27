const jwt=require('jsonwebtoken')
module.exports=(req,res,next)=>{
    try{
        let token=req.get("authorization").split(" ")[1];
        let decoded=jwt.verify(token,"secret");
        req.token=decoded;
        console.log(decoded);
        next();
    }
    catch(err){
        err.message="invalid token - Not Authenticated";
        err.status=403;
        next(err)
    }
}
module.exports.isAdmin=(req,res,next)=>{
    console.log(req.token.role);
    if(req.token.role=='admin'){
        next();
    }
    else{
        let error=new Error("invalid token - Not Authorized")
        error.status=403
        next(error)
    }
}
module.exports.isTeacher=(req,res,next)=>{
    console.log(req.token.role);
    if(req.token.role=='teacher'){
        next();
    }
    else{
        let error=new Error("invalid token - Not Authorized")
        error.status=403
        next(error)
    }
}
module.exports.isTeacherOrAdmin=(req,res,next)=>{
    console.log(req.token.role);
    if(req.token.role=='teacher'||req.token.role=='admin'){
        next();
    }
    else{
        let error=new Error("invalid token - Not Authorized")
        error.status=403
        next(error)
    }
}