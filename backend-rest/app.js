import createError from "http-errors";

import config from "./config.js"
import express from "express";
import taskRoutes from "./routes/taskRoutes.js";
import boardRoutes from "./routes/boardRoutes.js";
import logger from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";

await mongoose.connect(config.mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bodyParser.json())

app.use('/static/public', express.static(path.resolve("public")));
app.use('/static/uploads', express.static(path.resolve("uploads")));

app.use(taskRoutes);
app.use(boardRoutes);

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);
    res.render("error");
});

export default app;
