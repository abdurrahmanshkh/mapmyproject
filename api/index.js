import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import authRoute from "./routes/authRoute.js"
import projectRoute from "./routes/projectRoute.js"

const app=express()
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials",true)
    next()
})

app.use(cors({
    origin: "http://localhost:3000"
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoute)

//localhost:8080/api/project/create uses requireAuth middleware which only allows authenticated users to create new projects 
app.use("/api/project",projectRoute)
app.listen(8080,()=>{
    console.log("API working")
})
