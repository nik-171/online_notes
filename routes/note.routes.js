import express from "express";
import {
    createNote,
    getNotes,
    updateNote,
    deleteNote,
    getOneNote
} from "../controllers/note.controller.js";
import { auth } from "../middlewares/auth.js";
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const noteRouter = express.Router()


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


noteRouter.get('/note', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'note.html'));
});

noteRouter.use(auth);

noteRouter.get("/", getNotes)
noteRouter.get("/:id", getOneNote)
noteRouter.post("/", createNote)
noteRouter.put("/:id", updateNote)
noteRouter.delete("/:id", deleteNote)

export default noteRouter