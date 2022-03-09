const {response} = require("express");
var CourseCategoryModel = require("../model/CourseCategoryModel");
var CourseModel = require("../model/CourseModels");
function InsertCourseCategory(req,res){
    var courseCat= new CourseCategoryModel({
        cat_title:req.body.cat_title,
        cat_description:req.body.cat_description,
    });
    courseCat.save();
    res.redirect("/admin/insert-course");
}
async function ManageCourse(req, res){
    var data = await CourseModel.find({}).populate("category_id");
    res.render("admin/manageCourse",{"courses": data})
}
function InsertCourseForm(req,res){
    var data =  CourseCategoryModel.find({},(error,response)=>{
        res.render("admin/insertCourse",{"category":response});
    });
    
}
// post method insert function
function InsertCourse(req,res){
    var course = new CourseModel({
        title:req.body.name,
        instructor:req.body.instructor,
        duration:req.body.duration,
        price:req.body.price,
        discount_price:req.body.discount_price,
        // status:req.body.status,
        category_id:req.body.category_id,
        description:req.body.description,
    })
    course.save();
    res.redirect("/admin/insert-course");
}
module.exports = {
    InsertCourseCategory,
    InsertCourseForm,
    InsertCourse,
    ManageCourse,
}