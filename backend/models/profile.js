const mongoose= require('mongoose');

const userProfile =  mongoose.Schema({
  userName:{
    type: String,
    required: true,
  },
  firstName:{
    type:String,
    required:true,
  },
  lastName:{
    type:String,
    required:true,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
  }
})

module.exports= mongoose.model("Profile", userProfile);