const express= require('express');
const mongoose= require('mongoose');
const cors= require('cors');
require("dotenv").config();

const todoRouter= require('./router/todoRouter');
const authRouter= require("./router/authRouter");
const profileRouter = require("./router/profileRouter")

const app=express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const DB_url="";

app.use("/api/todo",profileRouter);
app.use("/api/todo",todoRouter);
app.use("/api/todo",authRouter);

const PORT=5000;

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  app.listen(PORT, (req,res)=>{
    console.log("server running on port 5000");
  })
})