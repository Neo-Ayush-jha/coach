var mongoose = require('mongoose')

var StudentCourseModel = mongoose.Schema({
    
    status:{type:Boolean,require:false,default:1},
    category_id:{type:mongoose.Schema.Types.ObjectId,ref:"courses"},
    studentId:{type:mongoose.Schema.Types.ObjectId,ref:"students"},
    doj:{type:mongoose.Schema.Types.ObjectId},
});

var studentCourse = mongoose.model("student-course",StudentCourseModel)

module.exports = studentCourse;