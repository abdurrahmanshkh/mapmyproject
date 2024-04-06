import express from "express"
import { login,register,logout, getSession } from "../controllers/authenticaton.js";
const router=express.Router()

router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)
router.get("/session",getSession)
export default router