import createError from "http-errors";

import config from "./config.js"
import express from "express";
import indexRoutes from "./routes/indexRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import boardRoutes from "./routes/boardRoutes.js";
import logger from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import mongoose from "mongoose";

await mongoose.connect(config.mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express();

app.set("views", path.resolve("views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/static/public', express.static(path.resolve("public")));
app.use('/static/uploads', express.static(path.resolve("uploads")));

app.use(indexRoutes);
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
