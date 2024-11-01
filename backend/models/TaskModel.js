import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    dueDate: {
        type: Date,
        required: false,
        trim: true
    },
    status: {
        type: String,
        enum: ['pendiente', 'completada'],
        default: 'pendiente'
    }
});

const Task = mongoose.model("Task", taskSchema);
export default Task;