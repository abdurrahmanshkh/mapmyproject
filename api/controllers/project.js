import {db} from "../connect.js"

export const createProject=(req,res)=>{
    const userID=req.user.userID
    const isManager=req.user.isManager
    if(!isManager){
        return res.status(500).json("You're not manager")
    }
    console.log("in createProject : ",req.user.userID)
    const projectName=req.body.projectName
    const projectDescription=req.body.projectDescription
    const projectDueDate=req.body.projectDueDate
    const projectStartDate=new Date().toISOString().slice(0, 19).replace("T", " ")
    const insertQuery=`INSERT INTO project(projectName,projectDescription,projectStartDate,projectDueDate,ownerID)VALUES(?)`
    const values=[projectName,projectDescription,projectStartDate,projectDueDate,userID]
    db.query(insertQuery,[values],(err)=>{
        if(err){
            console.error("Error creating project : ",err)
            return res.status(500).json(err)
        }
        return res.status(200).json("Project successfully created")
    })
}

export const retrieveProject=(req,res)=>{
    const userID=req.user.userID
    const isManager=req.user.isManager
    if(isManager){
        const managerProjectQuery="SELECT projectID,projectName,projectStartDate,projectDueDate FROM project WHERE ownerID=?"
        db.query(managerProjectQuery,[userID],(err,data)=>{
            if(err){
                console.log("Error retriving projects : ",err)
                return res.status(500).json("Internal server error")
            }
            return res.status(200).json(data)
        })
    }else{
        const contributerProjectQuery="SELECT projectID,projectName,projectStartDate,projectDueDate FROM project WHERE projectID in (SELECT parentProjectID from tasks WHERE assignedUser=?)"
        db.query(contributerProjectQuery,[userID],(err,data)=>{
            if(err){
                console.error("Error retriving contributer's project : ",err)
                return res.status(500).json("Internal server error")
            }
            return res.status(200).json(data)
        })
    }
}

