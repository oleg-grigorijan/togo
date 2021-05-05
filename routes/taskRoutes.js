import {Router} from "express";
import {Task} from "../model/task.js";
import {Board} from "../model/board.js";
import {multipart} from "../utils/multipart.js";

const router = Router()

router.post("/boards/:boardId/tasks", multipart.array("attachments", 10), async (req, res) => {
    const boardId = req.params.boardId;
    const board = await Board.findById(boardId);
    const task = new Task({
        title: req.body.title,
        isCompleted: false,
        deadline: req.body.hasDeadline ? req.body.deadline : null,
        attachments: req.files?.map(it => ({
            fileName: it.filename,
            originalFileName: it.originalname,
            encoding: it.encoding,
            mimeType: it.mimetype,
            size: it.size,
        })) ?? [],
    });
    board.tasks.push(task);
    await board.save();
    res.redirect(`/boards/${boardId}`);
})

router.post("/boards/:boardId/tasks/:taskId", async (req, res) => {
    const boardId = req.params.boardId;
    const taskId = req.params.taskId;
    const board = await Board.findById(boardId);
    board.tasks.id(taskId).isCompleted = !!req.body.isCompleted;
    await board.save();
    res.redirect(`/boards/${boardId}`);
})

router.post("/boards/:boardId/tasks/:taskId/remove", async (req, res) => {
    const boardId = req.params.boardId;
    const taskId = req.params.taskId;

    const board = await Board.findById(boardId);
    const task = board.tasks.id(taskId);
    task.remove();
    await board.save();
    // TODO: Remove task attachments

    res.redirect(`/boards/${boardId}`);
})


export default router;
