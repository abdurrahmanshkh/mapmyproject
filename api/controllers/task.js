import {db} from "../connect.js"

export const createTask = (req, res) => {
    const userID = req.user.userID;
    const taskName = req.body.taskName;
    const taskDescription = req.body.taskDescription;
    const taskStartDate = new Date(req.body.taskStartDate); // Convert to Date object
    const taskDueDate = new Date(req.body.taskDueDate); // Convert to Date object
    const taskStatus = req.body.taskStatus;
    const parentProjectID = req.params.id;
    console.log("user : ",userID)
    // Validate owner
    const validateOwnerQuery = "SELECT ownerID from project WHERE projectID=?";
    db.query(validateOwnerQuery, [parentProjectID], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }

        const ownerID = data[0].ownerID;

        if (ownerID !== userID) {
            return res.status(500).json("Only the owner can create a new task");
        }

        // Continue with task creation
        const val = [taskName, taskDescription, taskStatus, taskStartDate, taskDueDate, parentProjectID];
        const insertQuery = "INSERT INTO tasks(taskName, taskDescription, taskStatus, taskStartDate, taskDueDate, parentProjectID) VALUES (?)";

        db.query(insertQuery, [val], (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }

            return res.status(200).json("Task successfully created");
        });
    });
};

export const assignTask = (req, res) => {
    const parentProjectID = req.params.id;
    const userID=req.user.userID;
    const taskID = req.params.taskID;
    const assignedUsername = req.body.assignedUsername;
    let assignedUserID;
    console.log("userID : ",userID)
    // Define validateOwnerQuery
    const validateOwnerQuery = "SELECT ownerID FROM project WHERE projectID=?";

    db.query(validateOwnerQuery, [parentProjectID], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }

        const ownerID = data[0].ownerID;

        if (ownerID !== userID) {
            console.log("owner : ",ownerID)
            console.log("user : ",userID)

            return res.status(500).json("Only the owner can assign a task");
        }

        const getUserIDQuery = "SELECT userID FROM users WHERE name=?";
        db.query(getUserIDQuery, [assignedUsername], (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            // Check if result is empty
            if (!result || result.length === 0) {
                return res.status(404).json("User not found");
            }

            assignedUserID = result[0].userID;

            const val = [assignedUserID, taskID];
            const insertQuery = "INSERT INTO assigned(assignedUserID, assignedTaskID) VALUES (?, ?)";

            db.query(insertQuery, val, (err, data) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json(err);
                }

                return res.status(200).json("Task assgined successfully");
            });
        });
    });
};
