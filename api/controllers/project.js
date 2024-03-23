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

export const retriveProjects=(req,res)=>{
    //todo: add userType in database

    //this is gonna be a pain in the neck
    
    //if userType==manager
    //retrive req.user.userID
    //select projects where userID=ownerID

    //if userType==user
    //retrive req.user.userID
    //select projects where from tasks where taskID in (select assignedTaskID FROM assigned WHERE assignedUserID=req.user.userID)
        const username=req.params.username
        console.log("username : ",username)
        const getOwnerIDQuery=`SELECT userID FROM users WHERE name=?`
        db.query(getOwnerIDQuery,[username],(err,data)=>{
            if(err){
                console.error(err)
                return res.status(500).json("internal server error")
            }
            console.log("data : ",data)
            const ownerID=data[0].userID
            const getProjectQuery=`SELECT * FROM project WHERE ownerID=?`
            db.query(getProjectQuery,[ownerID],(err,data)=>{
                if(err){
                    console.error(err)
                    return res.status(500).json("Internal server error")
                }
                return res.status(200).json(data)
            })
        })
}

