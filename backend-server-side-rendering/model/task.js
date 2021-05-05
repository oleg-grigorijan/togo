import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    originalFileName: {
        type: String,
        required: true,
    },
    encoding: {
        type: String,
    },
    mimeType: {
        type: String,
    },
    size: {
        type: Number,
        required: true,
    },
})

export const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        required: true,
    },
    deadline: {
        type: Date,
        required: false
    },
    attachments: {
        type: [attachmentSchema],
        required: true
    }
});

export const Task = mongoose.model("Task", taskSchema)
