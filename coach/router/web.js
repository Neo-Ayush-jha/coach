var express = require("express")
var router = express.Router();

// student--------------------------------------------------------------------------
var {InsertStudent,StudentLogin, dashboard,manageStudentCourse,addStudentCourse,addStudentCourseStore,managePayment,requstPayment} = require("../controlers/StudentController");

// course--------------------------------------------------------------------------
var {InsertCourseForm, InsertCourseCategory,InsertCourse, ManageCourse} = require("../controlers/CourseController");

// admin--------------------------------------------------------------------------
var {DashboardView,ManageStudent,NewAdmission,ViewStudent,ApproveStudent,InsertAdmin,AdminLogin,logout,approvePayment} = require("../controlers/AdminController");


// image
// var PhotoControler = require('../controlers/PhotoController');
// var upload = require('../middleware/upload')
// router.get('/photo',PhotoControler.index);
// router.post('/photo/isert',upload.single('image'),PhotoControler.insert);
// -------------

const { route } = require("express/lib/application");
var auth = require("../middleware/auth");

router.get("/",function(req,res){
    res.render("home");
})

router.get("/apply" ,function(req,res){
    res.render("applyStudent");
})

router.post("/apply", InsertStudent);

// admin-------------------------------------------------------------------------------
router.get("/admin/dashboard",auth.isAuthorized ,DashboardView);
router.get("/admin/manage-students",auth.isAuthorized ,ManageStudent);
router.get("/admin/new-admission",auth.isAuthorized ,NewAdmission);
router.get("/admin/student/:id/view",auth.isAuthorized ,ViewStudent);
router.get("/admin/approve-student/:id",auth.isAuthorized ,ApproveStudent);
router.get("/admin/register",auth.isAuthorized ,InsertAdmin);
// courses------------------------------------------------------------------------------
router.get("/admin/manageCourse",auth.isAuthorized ,ManageCourse);
router.get("/admin/insert-course",auth.isAuthorized,InsertCourseForm);
router.post("/admin/insert-course-category",auth.isAuthorized,InsertCourseCategory);
router.post("/admin/insert-course",auth.isAuthorized,InsertCourse);
router.get("/admin/payment/:p_id/approve",auth.isAuthorized,approvePayment);


// login admin---------------------------------------------------------------
router.get("/admin/login", (req,res) =>{
    if(req.session.user_id){
        return res.redirect("/admin/dashboard");
    }
    res.render("login")
});
//  res.render("login");
router.post("/admin/login", AdminLogin);
router.get("/admin/logout", logout);


// student route------------------------------------------------------------------------
router.get("/student/dashboard",auth.isStudentAuthorized,dashboard);
router.get("/student/course/manage",auth.isStudentAuthorized,manageStudentCourse);
router.get("/student/course/add",auth.isStudentAuthorized,addStudentCourse);
router.get("/student/payment/manage",auth.isStudentAuthorized,managePayment);
router.get("/student/payment/manage/:p_id/request",auth.isStudentAuthorized,requstPayment);
router.post("/student/course/add",auth.isStudentAuthorized,addStudentCourseStore);
router.post("/student/login",StudentLogin);




module.exports = router;
