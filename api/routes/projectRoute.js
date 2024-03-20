import express from "express"
import {createProject, retriveProjects} from "../controllers/project.js";
import { requireAuth } from "../helpers.js";
const router=express.Router()

router.post("/create",requireAuth,createProject)
router.get("/:username/project/list",retriveProjects)
// router.get("/:id",)
// router.get("/description/:id",)

export default router