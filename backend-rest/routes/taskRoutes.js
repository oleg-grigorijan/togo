import {Router} from "express";
import {Task} from "../model/task.js";
import {Board} from "../model/board.js";
import {multipart} from "../utils/multipart.js";

const router = Router();

router.post("/boards/:boardId/tasks", multipart.array("attachments", 10), async (req, res) => {
    const boardId = req.params.boardId;
    const board = await Board.findById(boardId);

    const title = req.body.title;
    const deadline = req.body.deadline;
    const attachments = req.files?.map(it => ({
        fileName: it.filename,
        originalFileName: it.originalname,
        encoding: it.encoding,
        mimeType: it.mimetype,
        size: it.size,
    })) ?? [];

    const task = new Task({title, isCompleted: false, deadline, attachments,});
    board.tasks.push(task);
    const persisted = await board.save();

    res.status(201).send({id: persisted.id});
})

router.patch("/boards/:boardId/tasks/:taskId", async (req, res) => {
    const boardId = req.params.boardId;
    const taskId = req.params.taskId;
    const isCompleted = !!req.body.isCompleted;

    const board = await Board.findById(boardId);
    board.tasks.id(taskId).isCompleted = isCompleted;
    await board.save();

    res.status(204);
});

router.delete("/boards/:boardId/tasks/:taskId", async (req, res) => {
    const boardId = req.params.boardId;
    const taskId = req.params.taskId;

    const board = await Board.findById(boardId);
    const task = board.tasks.id(taskId);
    task.remove();
    await board.save();
    // TODO: Remove task attachments

    res.status(204);
});

export default router;
