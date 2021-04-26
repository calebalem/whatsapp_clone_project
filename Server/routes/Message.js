import express from 'express';
import {createMessage, syncMessage} from '../controllers/Message.controller.js';

const router = express.Router();
router.post('/new',createMessage);
router.get('/sync',syncMessage);

export default router;