import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes/index";
import userRouter from "./routes/user";
import folderRouter from "./routes/folder";
import fileRouter from "./routes/file";
import dataRouter from "./routes/data";

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", indexRouter);
app.use("/user/", userRouter);
app.use("/folder/", folderRouter);
app.use("/file/", fileRouter);
app.use("/data/", dataRouter);

export default app;
