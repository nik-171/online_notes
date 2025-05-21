import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email: { type: String, requied: true, unique: true },
    password: { type: String, required: true }
});

export default mongoose.model('User', userSchema)