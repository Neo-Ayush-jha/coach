var express = require("express")
var router = express.Router();
var {InsertStudent,StudentLogin, dashboard} = require("../controlers/StudentController");
var {InsertCourseForm, InsertCourseCategory,InsertCourse, ManageCourse} = require("../controlers/CourseController");
var {DashboardView,ManageStudent,NewAdmission,ViewStudent,ApproveStudent,InsertAdmin,AdminLogin,logout} = require("../controlers/AdminController");


const { route } = require("express/lib/application");
var auth = require("../middleware/auth");

router.get("/",function(req,res){
    res.render("home");
})

router.get("/apply" ,function(req,res){
    res.render("applyStudent");
})

router.post("/apply", InsertStudent);

// admin
router.get("/admin/dashboard",auth.isAuthorized ,DashboardView);
router.get("/admin/manage-students",auth.isAuthorized ,ManageStudent);
router.get("/admin/new-admission",auth.isAuthorized ,NewAdmission);
router.get("/admin/student/:id/view",auth.isAuthorized ,ViewStudent);
router.get("/admin/approve-student/:id",auth.isAuthorized ,ApproveStudent);
router.get("/admin/register",auth.isAuthorized ,InsertAdmin);
// courses
router.get("/admin/manageCourse",auth.isAuthorized ,ManageCourse);
router.get("/admin/insert-course",auth.isAuthorized,InsertCourseForm);
router.post("/admin/insert-course-category",auth.isAuthorized,InsertCourseCategory);
router.post("/admin/insert-course",auth.isAuthorized,InsertCourse);

// login admin
router.get("/admin/login", (req,res) =>{
    if(req.session.user_id){
        return res.redirect("/admin/dashboard");
    }
    res.render("login")
});
//  res.render("login");
router.post("/admin/login", AdminLogin);
router.get("/admin/logout", logout);


// student route
router.get("/student/dashboard",auth.isStudentAuthorized,dashboard);
router.post("/student/login",StudentLogin);



module.exports = router;
