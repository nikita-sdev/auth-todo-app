const Todo = require('../models/todo');


exports.getTodo = async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.userId });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching todos" });
  }
};
exports.postTodo= async (req,res,next)=>{
  try{
    const {task,date} = req.body;
    if(!task&& !date){
      return res.status(400).json({msg:"Both Task and Date required"});
    }else if(!task){
      return res.status(400).json({msg:"Task is required"});
    }else if(!date){
      return res.status(400).json({msg:"Date is required"});
    }
    const userId= req.userId;
    const todo = await new Todo({
      task,
      date,
      user: userId,
    })
    await todo.save();
    res.status(200).json(todo);
  }
  catch{
    res.status(500).json({msg:"todo not added"});
  }
}

exports.deleteTodo= async(req,res,next)=>{
  const {id} = req.params;
  await Todo.findOneAndDelete({
    _id:id,
    user: req.userId,
  });
  res.status(201).json({_id:id});
}


exports.updateTodo= async(req,res,next)=>{
  try{
    const {task,date}= req.body;
  const userId= req.userId;
  const {id}= req.params;
  await Todo.findByIdAndUpdate(
    {_id:id, user:userId},
    {task,date},
    { returnDocument: "after"}
  )
  res.json({mag:"Todo updated succesfully"})
  }
  catch{
    res.json({msg:"error while update"});
  }
}
