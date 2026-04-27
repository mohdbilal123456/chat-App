import express from 'express'
import { registerUser, loginUser } from '../controllers/UserController.js'
import { getLoggedInUser } from '../controllers/UserController.js'
import {protect, adminOnly} from '../middlewares/authMiddleware.js'
const router = express.Router()

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/me', protect, getLoggedInUser)

export default router