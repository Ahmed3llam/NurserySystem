const express=require('express');
const AuthRouter =express.Router();
const authController=require('../Controller/authCont');

AuthRouter.post(
    '/login',
    authController.LogIn
)

module.exports=AuthRouter