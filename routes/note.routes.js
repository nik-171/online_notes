import express from "express";
import {
    createNote,
    getNotes,
    updateNote,
    deleteNote
} from "../controllers/note.controller.js";
import { auth } from "../middlewares/auth.js";



const noteRouter = express.Router()

noteRouter.use(auth);
noteRouter.get("/", getNotes)
noteRouter.post("/", createNote)
noteRouter.put("/:id", updateNote)
noteRouter.delete("/:id", deleteNote)

export default noteRouter