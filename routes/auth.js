import { Router } from "express";
import {reg, login, getMe} from "../controllers/auth.js";
import { checkAuth } from "../utils/checkAuth.js";
const router = new Router()

//Register
// http://localhost:3002/api/auth/reg
router.post('/reg', reg)
//Login
// http://localhost:3002/api/auth/login
router.post('/login', login)
//Get Me
// http://localhost:3002/api/auth/me
router.get('/me', checkAuth, getMe)
export default router;