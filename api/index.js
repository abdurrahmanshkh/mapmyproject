import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


import authRoute from "./routes/authRoute.js"
import projectRoute from "./routes/projectRoute.js"
import taskRoute from "./routes/taskRoute.js"
import userRoute from "./routes/usersRoute.js"
const app=express()
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials",true)
    next()
})

app.use(cors({
    origin: "http://localhost:5173"
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoute)
app.use("/api/project",projectRoute)
app.use("/api/project",taskRoute)
app.use("/api",userRoute)
app.use("/api/project",projectRoute)
//localhost:8080/api/project/create uses requireAuth middleware which only allows authenticated users to create new projects 
app.use("/api/project",projectRoute)
app.listen(8080,()=>{
    console.log("API working")
})
