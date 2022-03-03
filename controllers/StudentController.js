var StudentModel =require("../model/StudentModels");
function InsertStudent(req,res){
    var stud = new StudentModel({
        name:req.body.name,
        father:req.body.father,
        contact:req.body.contact,
        email:req.body.email,
        address:req.body.address,
        gender:req.body.gender,
        education:req.body.education,
        password:req.body.password,
    });
    stud.save();
}
module.exports = {
    InsertStudent,
}