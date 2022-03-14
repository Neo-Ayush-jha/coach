const res = require("express/lib/response");
const studentCourse = require("../model/StudentCourseModels");
const courseModel = require("../model/CourseModels");
var studentModel = require("../model/StudentModels");
var PaymentModel = require("../model/PaymentModels");

async function getUser(req){
     std= await studentModel.findById(req.session.student_id);
     return std;
}

async function dashboard(req, res){
    // studentModel.findById(req.session.student_id,(error,response)=>{
        data = await getUser(req);
        return res.render("students/dashboard",{"student":data})
    
}

async function manageStudentCourse(req,res){
    std = await getUser(req);
    stdCourse = await studentCourse.find({studentId:std._id}).populate("courseId");
    console.log(stdCourse);
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
   

async function addStudentCourseStore(req,res){
    // var log = req.session.student_id;
    std = await getUser(req);
    // std = await studentModel.findById(log);
    stdCourse = await studentCourse.exists({'studentId':std._id,"courseId":req.body.courseId}).then((exist)=>{
        if(exist){
            res.redirect("/student/course/manage");
        }
        else{
            var currentDate = new Date();
            var stdCourse = studentCourse({
            studentId:std._id,
            courseId:req.body.courseId,
            doj:currentDate,
            status:1,
    });
    //     }
    // })
    // var currentDate = new Date();
    // // ---
    // var stdCourse = studentCourse({
    //     studentId:std._id,
    //     courseId:req.body.courseId,
    //     doj:currentDate,
    // });
    stdCourse.save();
    res.redirect("/student/course/manage")
        }
        console.log(courseData)
    })
}


async function addStudentCourse(req,res){
    
    // var log = req.session.student_id;
    courseData = await courseModel.find({});
    std = await getUser(req);
    // var  std = await studentModel.findById(log);
    // var courseData = await course.find({});
    console.log('this is course data');
        return res.render("students/addCourse",{"student":std,"course":courseData})
    }

    // payment
async function generatePayment(req,res){
    var log = req.session.student_id;
    stdCourse =await studentCourse.find({studentId:log}).populate("courseId");
    console.log(stdCourse)

    doj = stdCourse[0].doj;
    currentData = new Date();

    console.log(doj);

    // payment = PaymentModel({

    // })

}
async function managePayment(req,res){
    generatePayment(req,res);
    std = await getUser(req);
    studentPayment = await PaymentModel.find({stdId:std._id}).populate("courseId")
    res.render("students/managePayment",{studentPayment:studentPayment,"student":std});
}

// login
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

module.exports = {
    InsertStudent,
    StudentLogin,
    addStudentCourse,
    dashboard,
    manageStudentCourse,
    addStudentCourseStore,
    generatePayment,
    managePayment,
}
   
