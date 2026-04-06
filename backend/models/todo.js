const mongoose= require('mongoose');


const todoSchema= mongoose.Schema({
  task:{
    type: String,
    required: true,
  },
  date:{
    type: String,
    required : true,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

module.exports = mongoose.model("Todo", todoSchema);