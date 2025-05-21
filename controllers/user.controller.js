import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const registerUser = async (req, res) => {
    try {
        const { email, password, username } = req.body;

        // Проверка, существует ли пользователь
        const existingUser = await userModel.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "Пользователь уже существует" });

        // Хешируем пароль
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Создаём пользователя
        const user = new userModel({ email, password: passwordHash, username });
        await user.save();

        // Генерируем JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        res.status(201).json({
            token,
            user: { id: user._id, username: user.username },
        });
    } catch (err) {
        res.status(500).json({ message: "Ошибка регистрации" });
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Пользователь не найден' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Неверный пароль' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

export { registerUser, loginUser }