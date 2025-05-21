import express from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

// Регистрация
router.post("/register", registerUser);

// Логин
router.post("/login", loginUser);

router.get('/register', (req, res) => {
    res.send('Здесь должна быть форма регистрации или что-то подобное');
});  

export default router;