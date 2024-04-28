import express from "express"

import { requireAuth } from "../helpers.js";
import { createTask, insertPERTData, retrievePERTData, retrieveTask,updateTaskStatus} from "../controllers/task.js"
const router=express.Router()
//  idk why we have to split routes like this, its confusing
//  /api/project/:id/task/create
router.post("/:id/task/create",requireAuth,createTask)
router.get("/:id/task",requireAuth,retrieveTask)
// router.post("/:id/update/due-date",requireAuth,updateDueDate)
// router.post("/:id/update/contributer",requireAuth,updateAssignedUser)
router.post("/:id/update/status",requireAuth,updateTaskStatus)
router.post("/:id/pert",requireAuth,insertPERTData)
router.get("/:id/pert/data",requireAuth,retrievePERTData)
export default router
