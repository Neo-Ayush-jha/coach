var express =require("express");
const { modelName } = require("../../coach/model/StudentModels");
const { route } = require("../../coach/router/web");
var router = express.Router();

router.get("/",function(req,res){
    res.render("home");
})
router.get("/apply",function(req,res){
    res.render("applyStudent");
})

module.exports=router;