var express = require("express")
var router = express.Router();
var {InsertStudent} = require("../controlers/StudentController");
var {DashboardView,ManageStudent,NewAdmission,ViewStudent,ApproveStudent,InsertAdmin} = require("../controlers/AdminController");
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
router.get("/admin/dashboard",auth.isAuthorized ,DashboardView)
router.get("/admin/manage-students",auth.isAuthorized ,ManageStudent)
router.get("/admin/new-admission",auth.isAuthorized ,NewAdmission)
router.get("/admin/student/:id/view",auth.isAuthorized ,ViewStudent)
router.get("/admin/approve-student/:id",auth.isAuthorized ,ApproveStudent)
router.get("/admin/register",auth.isAuthorized ,InsertAdmin)


module.exports = router;
