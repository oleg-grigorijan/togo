import {Router} from "express";
import {Board} from "../model/board.js";

const router = Router()

router.get("/boards", async (req, res) => {
    const boards = await Board.find({})
    res.render("boards", {
        title: "Your boards",
        boards,
    })
})

router.post("/boards", async (req, res) => {
    const board = new Board({
        title: req.body.title,
        tasks: [],
    });
    const persisted = await board.save();

    res.redirect(`/boards/${persisted.id}`)
})

router.get("/boards/:boardId", async (req, res) => {
    const board = await Board.findById(req.params.boardId);
    res.render("board", {
        title: board.title,
        board: board,
    })
})

router.post("/boards/:boardId/remove", async (req, res) => {
    const board = await Board.findById(req.params.boardId);
    await board.remove();
    // TODO: Remove attachments of board tasks

    res.redirect("/boards")
})
export default router;
