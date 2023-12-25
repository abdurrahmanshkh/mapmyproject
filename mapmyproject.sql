use mapmyproject;



CREATE TABLE users (
	userID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	hashedPassword CHAR(60) NOT NULL,
	created DATETIME NOT NULL,
	userStatus BOOLEAN DEFAULT TRUE #inactive/active 
);

CREATE TABLE project(
	projectID INTEGER NOT NULL  AUTO_INCREMENT,
	projectName VARCHAR(255) NOT NULL,
	projectDescription TEXT,
	projectStartDate DATETIME NOT NULL,
	projectDueDate DATETIME,
	ownerID INTEGER NOT NULL,
	FOREIGN KEY (ownerID) REFERENCES users(userID),
	PRIMARY KEY(projectID)
);

CREATE TABLE tasks(
	taskID INTEGER NOT NULL AUTO_INCREMENT,
	taskName VARCHAR(255) NOT NULL,
	taskDescription TEXT,
	taskStatus VARCHAR(255),
	tastStartDate DATETIME,
	taskDueDate DATETIME,
	parentProjectID INTEGER NOT NULL,
	FOREIGN KEY (parentProjectID) REFERENCES project(projectID),
	PRIMARY KEY(taskID,parentProjectID)
);
CREATE TABLE assigned(
	assignedID INTEGER PRIMARY KEY AUTO_INCREMENT,
	assignedUserID INTEGER NOT NULL,
	assignedTaskID INTEGER NOT NULL,
	FOREIGN KEY (assignedTaskID) REFERENCES tasks(taskID),
	FOREIGN KEY (assignedUserID) REFERENCES users(userID)

);
-- Add unique constraint to the name column
ALTER TABLE users
ADD CONSTRAINT unique_name_email
UNIQUE (name, email);