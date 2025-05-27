import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import noteRouter from './routes/note.routes.js';
import { auth } from './middlewares/auth.js';
import userRouter from './routes/user.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/notes", noteRouter);
app.use("/api/users", userRouter);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));


const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('API работает!');
});

// Подключение к MongoDB и запуск сервера
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Подключено к MongoDB');
    app.listen(PORT, () => {
      console.log(`Сервер запущен на http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('Ошибка подключения к MongoDB:', err));
