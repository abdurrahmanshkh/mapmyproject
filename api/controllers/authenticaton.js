import {db} from "../connect.js"
import bcrpyt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = (req, res) => {
    const username=req.body.username
    const password=req.body.password
    const email=req.body.email
    const isManager=req.body.isManager
    console.log(username)
    console.log(req.body)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json("Invalid email format");
    }

    if (password.length < 8) {
        return res.status(400).json("Password must be at least 8 characters long");
    }

    const query = "SELECT * FROM users WHERE name=?";
    db.query(query, [username], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (data.length) {
            return res.status(409).json("User already exists");
        }

        const hashedPassword = bcrpyt.hashSync(password, bcrpyt.genSaltSync(10));

        // Add the current date to the created column
        const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");
        const insertQuery = "INSERT INTO users(name, email, hashedPassword, created, isManager) VALUES (?, ?, ?, ?, ?)";
        const values = [username, email, hashedPassword, currentDate, isManager];

        db.query(insertQuery, values, (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }

            return res.status(200).json("User has been created");
        });
    });
};

export const login=(req,res)=>{
    const query="SELECT * FROM users WHERE name=?"
    db.query(query,[req.body.username],(err,data)=>{
        if(err) {
            return res.status(500).json(err)
        }
        if (data.length===0){
            return res.status(404).json("User not found")
        }
        const hashedPassword=bcrpyt.compareSync(req.body.password,data[0].hashedPassword)
        if(!hashedPassword){
            return res.status(400).json("incorrect password")
        }

        const token=jwt.sign({userID:data[0].userID},"secretKey")
        const{password,...others}=data[0]
        console.log("token : ",token)
        res
        .cookie("accessToken",token,{
            httpOnly: true,
        })
        .status(200)
        .json(others);
    })    
}

export const logout=(req,res)=>{
    res.clearCookie("accessToken",{
        secure:true,
        sameSite:"none"
    }).status(200).json("User logged out successfully")
}