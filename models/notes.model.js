import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    title: { type: String, requied: true },
    content: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true })

export default mongoose.model('Note', notesSchema)