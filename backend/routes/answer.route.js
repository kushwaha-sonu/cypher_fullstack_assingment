import express from "express";
import {userResult} from "../controller/answer.controller.js";
import {verifyToken} from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/answer',verifyToken,userResult)

export default router;