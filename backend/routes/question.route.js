import express from 'express';
import { createQuestion,getAllQuestions } from '../controller/question.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
const router = express.Router();

router.post('/create',verifyToken, createQuestion);
router.get('/all-questions',verifyToken, getAllQuestions);

export default router;