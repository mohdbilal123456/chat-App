import express from 'express'
import { createQuestion, getAllQuestions, getQuestionById, updateQuestion, deleteQuestion,
    getAllTopics,
} 
from '../controllers/questionController.js'

import { protect, adminOnly } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/', protect, adminOnly, createQuestion)

router.get('/', getAllQuestions)

router.get('/topics', getAllTopics)

router.get('/:id', getQuestionById)

router.put('/:id', protect, adminOnly, updateQuestion)

router.delete('/:id', protect, adminOnly, deleteQuestion)

export default router