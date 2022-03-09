var studentModel = require("../model/StudentModels");
var AdminModel = require("../model/AdminModels");
var CourseModel = require("../model/CourseModels");
const{response} = require("express");

async function DashboardView(req,res){
    const students = await studentModel.countDocuments();
    const courses = await CourseModel.countDocuments();
    const NewAdmission = await studentModel.find({status:1}).countDocuments();
    res.render("admin/dashboard",{"students":students,"courses":courses,"newAdmission":NewAdmission});
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
    await studentModel.findOneAndUpdate({"_id": id},{status:2})
    res.redirect("/admin/manage-student");

}
async function DeactiveStudent(req,res){
    var id = req.params.id;
    await studentModel.findOneAndUpdate({"_id":id},{status:1},{new:true})
    res.render("/admin/student/${id}/view/");
}
function DeleteStudent(req,res){
    var del_id = req.parsms.id;
    studentModel.remove({"_id":del_id},function(error){
        if(error){
            throw error
        }else{
            res.redirect('/admin/new-admission')
        }
    })
}
// admin insertion work
function InsertAdmin(req,res){
    var admin= new AdminModel({
        name:"admin",
        email:"admim@gmail.com",
        password:"123"
    });
    admin.save();
}
async function AdminLogin(req,res){
    const email = req.body.email;
    try{
        // const email = req.body.email;
        const{email,password}=req.body;
        console.log(email);
        const result = await AdminModel.findOne({email:email});
        console.log(result);
        if(result != null){
            if(result.email == email && result.password == password){
                req.session.user_id = result._id;
                res.redirect('/admin/dashboard')
            }
            else{
                res.send('worng password')
            }
        }else{
            var err = new Error("Username or password in incorrect try again")
            err.status = 401;
            res.redirect("/admin/login");
        }
    }catch (error){
        console.log(error.massage);
    }
}

function logout(req,res){
    req.session.destory();
    res.redirect("/admin/login");
}


module.exports = {
    DashboardView,
    ManageStudent,
    NewAdmission,
    ViewStudent,
    ApproveStudent,
    InsertAdmin,
    DeactiveStudent,
    DeleteStudent,
    AdminLogin,
    logout,
}