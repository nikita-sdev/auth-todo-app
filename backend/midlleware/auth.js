const jwt= require('jsonwebtoken');
require("dotenv").config();

exports.authMiddleware= (req,res,next)=>{
  const authHeader = req.headers.authorization;
  if(!authHeader){
    return res.status(400).json({msg:"no token"});
  }

  const token = authHeader.split(" ")[1];
  try{
    const decoded= jwt.verify(token, process.env.JWT_KEY);
    req.userId= decoded.userId;
    next();
  }
  catch(Err){
    res.status(401).json({msg: "Invalid token"});
  }
}