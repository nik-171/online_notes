import express from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.js";
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



router.get('/reglog', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'main.html'));
});


// Регистрация
router.post("/register", registerUser);

// Логин
router.post("/login", loginUser);

export default router;