var mongoose = require('mongoose')

var CourseModel = mongoose.Schema({
    title:{type:String,require:true},
    duration:{type:Number,require:true},
    instructor:{type:String,require:true},
    price:{type:Number,require:true},
    discount_print:{type:Number,require:false},
    description:{type:String,require:true},
    status:{type:Boolean,require:false,default:true},
    category_id:{type:mongoose.Schema.Types.ObjectId,ref:"course-category"}
});

var course = mongoose.model("courses",CourseModel)

module.exports = course;