const express=require('express');
const {isAdmin,isTeacher,isTeacherOrAdmin}=require('../MW/AuthMw/authMw')
const teacherValidator=require('../MW/Validation/teacherVal');
const validator=require('../MW/Validation/validator');
const teachersController=require('../Controller/teacherCont');
const teachersRouter=express.Router();

teachersRouter.route('/teachers')
    .get(
        isTeacherOrAdmin,
        teachersController.getAllTeachers
    ) 
    .post(
        isAdmin,
        teacherValidator.insertTeacher,
        validator,
        teachersController.AddTeacher
    )
    .put(
        isTeacherOrAdmin,
        teacherValidator.updateTeacher,
        validator,
        teachersController.UpdateTeacher
    )

teachersRouter.get(
    '/teachers/supervisors',
    isTeacher,
    teachersController.getTeacherSupervisors
)    

teachersRouter.route('/teachers/:id')
    .get(
        isTeacherOrAdmin,
        teacherValidator.pramValid,
        validator,
        teachersController.getTeacherByID
    )
    .delete(
        isAdmin,
        teacherValidator.pramValid,
        validator,
        teachersController.DeleteTeacher
    )

module.exports=teachersRouter