const express=require('express');
const morgan = require('morgan');
const cors = require('cors');
const Server=express()
const teachers=require('./Route/teachersRoute');
const childs=require('./Route/childsRoute');
const classes=require('./Route/classRoute');
const Auth=require('./Route/authRoute');
const AuthMW=require('./MW/AuthMw/authMw');


//conection 
const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/NurserySystem').then(()=>{
    console.log('connected to database')
    Server.listen(9999,()=>{
        console.log('server is running')
    });
}).catch(err => console.log(err))

var corsoptions = {
    origin:'*',
    optionsSuccessStatus:200,
    credentials:true,
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue:true,
    allowedHeaders:'Content-Type,Authorization',
    exposedHeaders:'Authorization',
    maxAge:3600,
}
//accept requests from clients running on different domains or ports
Server.use(cors(corsoptions));


Server.use(morgan('Url -> :url , Method -> :method '));

Server.use(express.json());

//routes
Server.use(Auth);
Server.use(AuthMW);
Server.use(teachers);
Server.use(childs);
Server.use(classes);

/********* */
Server.use((req,res)=>{
    res.status(404).json({
        data:'page not found'
    })
})

Server.use((error,req,res,next)=>{
    res.status(error.status||500).json({
        data:'Error : '+error
    })
})