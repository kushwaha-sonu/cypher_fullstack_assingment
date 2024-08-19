import express from 'express';
import {
    registerUser,
    loginUser,
    updatePassword,
    logOut,
   
} from '../controller/auth.controller.js';


const router = express.Router();



router.post('/register', registerUser);
router.post('/login',loginUser);
router.put('/update-password',updatePassword);
router.post('/logout',logOut)



export default router;