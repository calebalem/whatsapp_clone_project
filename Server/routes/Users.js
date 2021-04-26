import express from 'express';
import {registerUser, userLogin, defaultAction, tokenIsValid} from '../controllers/User.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post("/register",registerUser);

router.post("/login", userLogin);

router.post("/tokenIsValid", tokenIsValid);
router.get("/",auth,defaultAction);

export default router;