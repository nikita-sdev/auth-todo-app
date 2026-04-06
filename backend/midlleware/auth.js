const jwt= require('jsonwebtoken');
require("dotenv").config();

exports.authMiddleware= (req,res,next)=>{
  const token = req.headers.authorization;
  if(!token){
    return res.status(400).json({msg:"no token"});
  }

  try{
    const decoded= jwt.verify(token, process.env.JWT_KEY);
    req.userId= decoded.userId;
    next();
  }
  catch(Err){
    res.status(400).json({msg: "Invalid token"});
  }
}