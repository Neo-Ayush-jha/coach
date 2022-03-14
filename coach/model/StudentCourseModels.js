var mongoose = require('mongoose')

var StudentCourseModel = mongoose.Schema({
    
    status:{type:Number,require:true,default:1},
    courseId:{type:mongoose.Schema.Types.ObjectId,ref:"courses"},
    studentId:{type:mongoose.Schema.Types.ObjectId,ref:"student"},
    doj:{type:Date},
});

var studentCourse = mongoose.model("student-course",StudentCourseModel)

module.exports = studentCourse;