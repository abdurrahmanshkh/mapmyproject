import express from "express"

import { requireAuth } from "../helpers.js";
import { assignTask, createTask, getTask } from "../controllers/task.js";
const router=express.Router()
//  idk why we have to split routes like this, its confusing 
//  /api/project/:id/task/create 
router.post("/:id/task/create",requireAuth,createTask)
router.post("/:id/task/:taskID/assign",requireAuth,assignTask)
router.get("/:id/task/view",getTask)

export default router