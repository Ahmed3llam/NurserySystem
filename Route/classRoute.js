const express=require('express');
const classRouter=express.Router();
const classController=require('../Controller/classCont');
const classValidator=require('../MW/Validation/classVal');
const validator=require('../MW/Validation/validator');
const {isAdmin,isTeacher,isTeacherOrAdmin}=require('../MW/AuthMw/authMw')

classRouter.route('/classes')
    .get(
        isTeacherOrAdmin,
        classController.getAllClasses
    ) 
    .post(
        isAdmin,
        classValidator.insertClass,
        validator,
        classController.AddClass
    )
    .put(
        isTeacherOrAdmin,
        classValidator.updateClass,
        validator,
        classController.UpdateClass
    )

classRouter.get(
    '/classes/children/:id', 
    isTeacherOrAdmin,
    classValidator.pramValid, 
    validator, 
    classController.getClassChildren
)

classRouter.get(
    '/classes/supervisors/:id',
    isAdmin, 
    classValidator.pramValid, 
    validator, 
    classController.getSupervisors
)

classRouter.route('/classes/:id')
    .get(
        isTeacherOrAdmin,
        classValidator.pramValid,
        validator,
        classController.getClass
    )
    .delete(
        isAdmin,
        classValidator.pramValid,
        validator,
        classController.DeleteClass
    )

module.exports=classRouter