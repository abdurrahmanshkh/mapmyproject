import express from "express"
import cors from "cors"
import authRoute from "./routes/authRoute.js"
import cookieParser from "cookie-parser"
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
app.listen(8080,()=>{
    console.log("API working")
})
