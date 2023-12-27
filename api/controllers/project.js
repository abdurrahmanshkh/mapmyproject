import {db} from "../connect.js"

export const createProject=(req,res)=>{
    const userID=req.user.userID
    console.log("in createProject : ",req.user.userID)
    const projectName=req.body.projectName
    const projectDescription=req.body.projectDescription
    const projectDueDate=req.body.projectDueDate
    const projectStartDate=new Date().toISOString().slice(0, 19).replace("T", " ")
    const insertQuery=`INSERT INTO project(projectName,projectDescription,projectStartDate,projectDueDate,ownerID)VALUES(?)`
    const values=[projectName,projectDescription,projectStartDate,projectDueDate,userID]
    db.query(insertQuery,[values],(err,data)=>{
        if(err){
            return res.status(500).json(err)
        }
        return res.status(200).json("Project successfully created")
    })
}
