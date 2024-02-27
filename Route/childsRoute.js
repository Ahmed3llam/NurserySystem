const express=require('express');
const childsRouter=express.Router();
const childsController=require('../Controller/childCont');
const childValidator=require('../MW/Validation/childVal');
const validator=require('../MW/Validation/validator');
const {isAdmin,isTeacher,isTeacherOrAdmin}=require('../MW/AuthMw/authMw')

childsRouter.route('/childs')
    .get(
        isTeacherOrAdmin,
        childsController.getAllChilds
    ) 
    .post(
        isAdmin,
        childValidator.insertChild,
        validator,
        childsController.AddChild
    )
    .put(
        isAdmin,
        childValidator.updateChild,
        validator,
        childsController.UpdateChild
    )

childsRouter.route('/childs/:id')
    .get(
        isTeacherOrAdmin,
        childValidator.pramValid,
        validator,
        childsController.getChild
    )
    .delete(
        isAdmin,
        childValidator.pramValid,
        validator,
        childsController.DeleteChild
    )

module.exports=childsRouter