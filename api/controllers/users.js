import { db } from "../connect.js";

export const getProfile = (req, res) => {
    const userID = req.user.userID;

    const getProjectQuery = `SELECT projectName,projectDescription,projectStartDate,projectDueDate FROM project WHERE ownerID=?`;
    db.query(getProjectQuery, [userID], (err, projectData) => {
        if (err) {
            console.log(err);
            return res.status(500).json("Internal server error");
        }

        const getUsernameQuery = "SELECT name FROM users WHERE userID=?";
        db.query(getUsernameQuery, [userID], (err, userData) => {
            if (err) {
                console.log(err);
                return res.status(500).json("Internal server error");
            }

            return res.status(200).json({
                projects: projectData,
                username: userData[0].name,
            });
        });
    });
};
