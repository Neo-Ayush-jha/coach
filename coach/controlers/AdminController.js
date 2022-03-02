var studentModel = require("../model/StudentModels");
var AdminModel = require("../model/AdminModels");


async function DashboardView(req,res){
    const students = await studentModel.countDocuments({s});
    res.render("admin/dashboard",{"students":students});
}
function ManageStudent(req,res){
    studentModel.find({status:2},(error,response)=>{
        
        res.render("admin/manageStudent",{'student':response});
    });
}

function ViewStudent(req,res){
    var id = req.params.id;
    studentModel.findOne({_id:id},(error,response)=>{
        
        res.render("admin/ViewStudent",{'student':response});
    });
}
function NewAdmission(req,res){
    studentModel.find({status:1},(error,response)=>{
        
        res.render("admin/manageStudent",{'student':response});
    });
}
   async function ApproveStudent(req,res){
    id=req.params.id;
    await studentModel.findOneAndUpdate({"_id": id},{status:2},{new:true})
    res.redirect("/admin/manage-student");

}
// admin insertion work
function InsertAdmin(req,res){
    var admin= new AdminModel({
        name:"admin",
        email:"admim@gmail.com",
        password:"123654"
    });
    admin.save();
}


module.exports = {
    DashboardView,
    ManageStudent,
    NewAdmission,
    ViewStudent,
    ApproveStudent,
    InsertAdmin,
}