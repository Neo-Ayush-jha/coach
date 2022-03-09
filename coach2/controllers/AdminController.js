var studentModel =require("../model/StudentModels");
// var AdminModel = require("../model/AdminModels");
const{response} =require("express");

async function DashboardView(req,res){
    const students =await studentModel.countDocuments;
    res.render("admin/dashboard",{"students":students});
}

module.exports = {
    DashboardView,
}