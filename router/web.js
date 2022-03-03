var express =require("express");
var router = express.Router();
var {InsertStudent} = require("../controllers/StudentController");
var {DashboardView} = require("../controllers/AdminController");
router.get("/",function(req,res){
    res.render("home");
})
router.get("/apply",function(req,res){
    res.render("applyStudent");
})
router.post("/apply",InsertStudent);

// admin
router.get("/admin/dashboard",DashboardView);

module.exports=router;