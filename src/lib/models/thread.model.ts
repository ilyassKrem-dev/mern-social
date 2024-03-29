import mongoose from "mongoose";


const threadShema = new mongoose.Schema({
   content: {
      text:{type:String,required:true},
      images:[String]
   },
   author:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
   },
   community:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Community'
   },
   createdAt:{
    type: Date,
    default: Date.now
   },
   likedBy:[
      {
         type:mongoose.Schema.Types.ObjectId,
         ref: "User",
         index:true
      }
   ],
   parentId:{
    type: String
   },
   children:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Thread'
   }]
})

const Thread = mongoose.models.Thread || mongoose.model('Thread',threadShema)

export default Thread;