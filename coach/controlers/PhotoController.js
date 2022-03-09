// const photoModel = require('../model/photoModel')
// class PhotoControler{
//     static index = async (req , res)=>{
//         try{
//             photoModel.find({},function(error,results){
//                 if(error){
//                     console.log('data not fetch');
//                 }
//                 else{
//                     res.render('photo',{data:results})
//                 }
//             })
//         }catch (error){
//             console.log(error);
//         }
//     }
//     static insert = async(req,res)=>{
//         try{
//             var uploadCollection = new photoModel({
//                 image:req.file.filename
//             })
//             await uploadCollection.save();
//             console.log('data inserted successfully');
//         }catch(error){
//             console.log(error);
//         }
//     }
// }
// module.exports = PhotoControler;