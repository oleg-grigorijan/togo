import {Router} from "express";
import {Board} from "../model/board.js";

const router = Router()

router.get("/boards", async (req, res) => {
    const boards = await Board.find({})
    res.status(200).send(boards.map(it => ({
        id: it.id,
        title: it.title
    })));
});

router.post("/boards", async (req, res) => {
    const title = req.body.title;
    const board = new Board({title, tasks: []});
    const persisted = await board.save();

    res.status(201).send({id: persisted.id});
});

router.get("/boards/:boardId", async (req, res) => {
    const board = await Board.findById(req.params.boardId);
    res.status(200).send({
        id: board.id,
        title: board.title,
        tasks: board.tasks.map(task => ({
            id: task.id,
            title: task.title,
            isCompleted: task.isCompleted,
            attachments: task.attachments.map(attachment => ({
                fileName: attachment.fileName,
                originalFileName: attachment.originalFileName,
                mimeType: attachment.mimeType,
            })),
        })),
    });
});

router.delete("/boards/:boardId", async (req, res) => {
    await Board.findByIdAndRemove(req.params.boardId);
    // TODO: Remove attachments of board tasks

    res.send(204);
});

export default router;
