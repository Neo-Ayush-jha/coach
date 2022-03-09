const res = require("express/lib/response");
const studentCourse = require("../model/StudentCourseModels");
var studentModel = require("../model/StudentModels");

function dashboard(req, res){
    studentModel.findById(req.session.student_id,(error,response)=>{
        return res.render("students/dashboard",{"student":response})
    })
}

async function manageStudentCourse(req,res){
    var log = req.session.student_id;
    std = await studentModel.findById(log);
    stdCourse = await studentCourse.find({studentId:log});

    res.render("students/manageCourse",{'student':std,"studentCourse":stdCourse})
}

function InsertStudent(req,res){
    var stud= new studentModel({
        name:req.body.name,
        father:req.body.father,
        email:req.body.email,
        contact:req.body.contact,
        address:req.body.address,
        gender:req.body.gender,
        education:req.body.education,
        password:req.body.password
    });
    stud.save();
    res.redirect("/apply");
}
    StudentLogin= async(req,res)=>{
    try{
        const{email,password}=req.body;
        console.log(email);
        const result = await studentModel.findOne({email:email});
        console.log(result);
        if(result != null){
            if(result.email == email && result.password == password){
                req.session.student_id = result._id;
                res.redirect('/student/dashboard')
            }
            else{
                res.send('worng password')
            }
        }else{
            res.send('wrong email and password')
        }
    }catch (error){
        console.log(error.massage);
    }
};

function addStudentCourse(){
    // pending work
}

module.exports = {
    InsertStudent,
    StudentLogin,
    addStudentCourse,
    dashboard,
    manageStudentCourse,
}