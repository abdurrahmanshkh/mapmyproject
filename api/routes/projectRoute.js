import express from "express"
import {calculateProgress, createProject, retrieveProject} from "../controllers/project.js";
import { requireAuth } from "../helpers.js";
const router=express.Router()

router.post("/create",requireAuth,createProject)
router.get("/list",requireAuth,retrieveProject)
router.get("/:id/progress",requireAuth,calculateProgress)
// router.get("/description/:id",)

export default router