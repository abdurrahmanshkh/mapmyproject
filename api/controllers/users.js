import { db } from "../connect.js";

export const getProfile = (req, res) => {
    const userID = req.body.userID;
    const getUsernameQuery="SELECT name FROM users WHERE userID=?"
    db.query(getUsernameQuery,[userID],(err,data)=>{
        if(err){
            console.log(err)
            return res.status(500).json("Internal server error")
        }
        return res.status(200).json(data)
    })
}