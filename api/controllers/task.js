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
    if(!isManager){
        return res.status(500).json("Only manager can create new tasks")
    }
    db.query(validateOwnerQuery,[parentProjectID],(err,data)=>{
        if(err){
            console.log("Error : ",err)
            return res.status(500).json("Internal server error")
        }
        if(data[0].ownerID!==userID){
            return res.status(500).json("Only Manager is allowed to perform this action")
        }
    })

  
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
    const parentProjectID = parseInt(req.params.id);
    const getTaskQuery = "SELECT taskID,taskName,taskDescription,taskStatus,taskStartDate,taskDueDate,assignedUser,optimistic,pessimistic,likely FROM tasks WHERE parentProjectID=?";
    const isManager = req.user.isManager;
    const assignedUserID = req.user.userID;

    if (!isManager) {
        const getAssignedTask = "SELECT taskID,taskName,taskDescription,taskStatus,taskStartDate,taskDueDate,assignedUser,optimistic,pessimistic,likely FROM tasks WHERE parentProjectID=? AND assignedUser=?";
        console.log("task: ", parentProjectID, assignedUserID);
        db.query(getAssignedTask, [parentProjectID, assignedUserID], (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json("Internal server error");
            }
            return res.status(200).json(data);
        });
    } else {
        db.query(getTaskQuery, [parentProjectID], (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json("Internal server error");
            }
            return res.status(200).json(data);
        });
    }
};

export const retrieveContributerTask=(req,res)=>{
    const parentProjectID = parseInt(req.params.id);
    const getTaskQuery="SELECT assginedUser,taskStatus FROM tasks WHERE parentProjectId=?"
    db.query(getTaskQuery,[parentProjectID],(err,data)=>{
        let completedUserMapping = {};
        data.forEach(element => {
            if (!completedUserMapping[element.assignedUser]) {
                completedUserMapping[element.assignedUser] = {
                    completed: 0,
                    pending: 0,
                    total: 0
                };
            }
            // Increment the appropriate count based on the task status
            if (element.taskStatus === 'completed') {
                completedUserMapping[element.assignedUser].completed++;
            } else if (element.taskStatus === 'pending') {
                completedUserMapping[element.assignedUser].pending++;
            }
            completedUserMapping[element.assignedUser].total++;
        });
        return res.status(200).json(completedUserMapping)
    })

}

export const insertPERTData = (req, res) => {
    const parentProjectID = req.params.id;
    const taskIDs = req.body.taskIDs;
    const optimistic = req.body.optimisticTimes;
    const pessimistic = req.body.pessimisticTimes;
    const likely = req.body.mostLikelyTimes;
    console.log("task ", taskIDs, optimistic, pessimistic, likely);

    const PERTInsertQuery = "UPDATE tasks SET optimistic=?, pessimistic=?, likely=? WHERE taskID=?";
    const promises = []; // Array to store promises for each database query

    for (let i = 0; i < taskIDs.length; i++) {
        let taskID = taskIDs[i];
        let op = optimistic[i];
        let ps = pessimistic[i];
        let ml = likely[i];

        // Create a promise for each database query
        const promise = new Promise((resolve, reject) => {
            db.query(PERTInsertQuery, [op, ps, ml, taskID], (err, result) => {
                if (err) {
                    reject(err); // Reject the promise if there's an error
                } else {
                    resolve(); // Resolve the promise if the query is successful
                }
            });
        });
        promises.push(promise); // Push the promise to the array
    }

    // Wait for all promises to resolve
    Promise.all(promises)
        .then(() => {
            res.status(200).json("OK"); // Send response after all queries are completed
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json("Internal server error");
        });
};

export const retrievePERTData = (req,res) =>{
    const parentProjectID=req.params.id
    const PERTQuery="SELECT optimistic,pessimistic,likely FROM tasks WHERE parentProjectID=?"
    db.query(PERTQuery,[parentProjectID],(err,data)=>{
        if(err){
            console.log("PERT error : ",err)
            return res.status(500).json("Internal server error")
        }
        console.log("per data : ",data)
        return res.status(200).json(data)
    })
}
