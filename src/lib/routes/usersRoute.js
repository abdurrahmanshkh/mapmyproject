import express from "express"
const router=express.Router()
import { requireAuth } from "../helpers.js"
import { getProfile } from "../controllers/users.js"
router.get("/profile",requireAuth,getProfile)
export default router