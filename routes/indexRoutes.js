import {Router} from "express";

const router = Router();

router.get("/", (req, res) => {
    res.redirect("/boards")
})

export default router;
