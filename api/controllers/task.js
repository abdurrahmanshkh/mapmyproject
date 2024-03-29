import {db} from "../connect.js"

export const createTask = (req, res) => {
    const userID = req.user.userID;
    const isManager=req.user.isManager
    const taskName = req.body.taskName;
    const taskDescription = req.body.taskDescription;
    const taskStartDate = new Date(req.body.taskStartDate); // Convert to Date object
    const taskDueDate = new Date(req.body.taskDueDate); // Convert to Date object
    const taskStatus = req.body.taskStatus;
    const parentProjectID = req.params.id;
    const assignedUsername=req.body.assignedUsername
    const usernameQuery="SELECT * FROM users WHERE name=?"
    const validateOwnerQuery="SELECT ownerID FROM project WHERE projectID=?"
    console.log("ASSIGNED USER NAME : ", assignedUsername)

    db.query(validateOwnerQuery,[parentProjectID],(err,data)=>{
        if(err){
            console.log("Error : ",err)
            return res.status(500).json("Internal server error")
        }
        if(data[0].ownerID!==userID){
            return res.status(500).json("Only Manager is allowed to perform this action")
        }
    })

    if(!isManager){
        return res.status(500).json("Only manager can create new tasks")
    }
    db.query(usernameQuery,[assignedUsername],(err,data)=>{
        if(err){
            console.log("Error in creating task",err)
            return res.status(500).json("Internal server error")
        }
        const assignedUserID=data[0].userID
        const val = [taskName, taskDescription, taskStatus, taskStartDate, taskDueDate, parentProjectID,assignedUserID];
        const insertQuery = "INSERT INTO tasks(taskName, taskDescription, taskStatus, taskStartDate, taskDueDate, parentProjectID,assignedUser) VALUES (?)";

        db.query(insertQuery, [val], (err) => {
            if (err) {
                console.log("Error creating task : ",err)
                return res.status(500).json("Interval server error");
            }   
                return res.status(200).json("Task successfully created");
        });
    })
       
};


export const updateTaskStatus=(req,res)=>{
    const taskID=req.params.id
    const taskStatus=req.body.status
    console.log(taskID,taskStatus)
    const updateTaskQuery="UPDATE tasks SET taskStatus=? WHERE taskID=?"
    db.query(updateTaskQuery,[taskStatus,taskID],(err)=>{
        if(err){
            console.log("Error updating task status : ",err)
            return res.status(500).json("Internal server error")
        }
        return res.status(200).json("Task Status Updated Successfully")
    })
}

export const updateDueDate=(req,res)=>{
    const isManager=req.user.isManager
    if(!isManager){
        return res.status(500).json("Only manager is allowed to perform this action")
    }
    const taskDueDate = new Date(req.body.taskDueDate); // Convert to Date object
    const taskID=req.params.id
    const updateDueDateQuery="UPDATE tasks SET taskDueDate=? WHERE taskID=?"
    db.query(updateDueDateQuery,[taskDueDate,taskID],(err)=>{
        if(err){
            console.log("Error updating task status : ",err)
            return res.body(500).json("Internal server error")
        }
        return res.body(200).json("Task Status Updated Successfully")
    })
}

export const updateAssignedUser=(req,res)=>{
    const isManager=req.user.isManager
    if(!isManager){
        return res.status(500).json("You're not manager")
    }
    const assignedUsername = req.body.assignedUsername // Convert to Date object
    const taskID=req.params.id
    const getUserIDQuery="SELECT userID FROM users WHERE name=?"
    const updateAssignedUserQuery="UPDATE tasks SET assignedUser=? WHERE taskID=?"

    db.query(getUserIDQuery,[assignedUsername],(err,data)=>{
        if(err){
            console.log("Error updating task status : ",err)
            return res.status(500).json("Internal server error")
        }
        const assignedUserID=data[0].userID
        db.query(updateAssignedUserQuery,[assignedUserID,taskID],(err)=>{
            if(err){
                console.log("Error updating task status : ",err)
                return res.body(500).json("Internal server error")
            }
            return res.status(200).json("Contributer Updated Successfully")
        })
    
    })
}

export const retrieveTask = (req, res) => {
    const parentProjectID = req.params.id; // Use req.params.id instead of req.param.id
    const getTaskQuery = "SELECT taskID,taskName,taskDescription,taskStatus,taskStartDate,taskDueDate,assignedUser FROM tasks WHERE parentProjectID=?";
 
    db.query(getTaskQuery, [parentProjectID], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json("Internal server error");
        }
        return res.status(200).json(data);
    });
};

