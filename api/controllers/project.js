import {db} from "../connect.js"

export const createProject=(req,res)=>{
    const userID=req.user.userID
    const isManager=req.user.isManager
    if(!isManager){
        return res.status(500).json("Only manager is allowed to perform this action")
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
    console.log(isManager,userID)
    if(isManager){
        const managerProjectQuery="SELECT projectID,projectName,projectDescription,projectStartDate,projectDueDate FROM project WHERE ownerID=?"
        db.query(managerProjectQuery,[userID],(err,data)=>{
            if(err){
                console.log("Error retriving projects : ",err)
                return res.status(500).json("Internal server error")
            }
            return res.status(200).json(data)
        })
    }else{
        const contributerProjectQuery="SELECT projectID,projectName,projectDescription,projectStartDate,projectDueDate FROM project WHERE projectID in (SELECT parentProjectID from tasks WHERE assignedUser=?)"
        db.query(contributerProjectQuery,[userID],(err,data)=>{
            if(err){
                console.error("Error retriving contributer's project : ",err)
                return res.status(500).json("Internal server error")
            }
        
            return res.status(200).json(data)
        })
    }
}

export const calculateProgress=(req,res)=>{
    const projectID=req.params.id
    const statusQuery="SELECT taskStatus FROM tasks WHERE parentProjectID=?"
    db.query(statusQuery,[projectID],(err,data)=>{
        if(err){
            console.log(err)
            return res.status(500).json("Internal server error")
        }
        const completedTask=data.filter((data)=>data.taskStatus==='completed').length
        const pendingTask=data.filter((data)=>data.taskStatus==='pending').length
        const completedPercent=completedTask*100/(pendingTask+completedTask)
        let newdata=[
            completedPercent,
            completedTask,
            pendingTask
        ]
        console.log("data: ",newdata)
        return res.status(200).json(newdata)
    })
}