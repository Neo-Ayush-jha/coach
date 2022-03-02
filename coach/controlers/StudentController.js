var studentModel = require("../model/StudentModels");

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
}

module.exports = {
    InsertStudent,
}