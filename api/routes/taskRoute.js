import express from "express"

import { requireAuth } from "../helpers.js";
import { createTask, retrieveTask } from "../controllers/task.js";
const router=express.Router()
//  idk why we have to split routes like this, its confusing 
//  /api/project/:id/task/create 
router.post("/:id/task/create",requireAuth,createTask)
router.get("/:id/task",requireAuth,retrieveTask)

export default router