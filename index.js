 import express from "express"
 import dotenv from "dotenv";
 import mongoose from "mongoose";
 import cors from "cors"
 import { todoRouter } from "./routes/todo.js";
 import {authRouter} from "./routes/auth.js"


 dotenv.config();

 const server=express();

 server.use(express.json())
 server.use(cors())


 server.use('/auth' , authRouter)
 server.use('/todos' , todoRouter)


 mongoose.connect(process.env.MONGODB_URI).then(()=>{
  console.log("DB connected")
 }).catch((error)=>{
   console.log(error)
 })



 
  server.listen(process.env.PORT || 8080 , ()=>{
    console.log(`Server started at ${process.env.PORT}`)
  })


 