import mongoose from "mongoose";
import {taskSchema} from "./task.js";

export const Board = mongoose.model("Board", new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    tasks: {
        type: [taskSchema],
        required: true,
    },
}))
