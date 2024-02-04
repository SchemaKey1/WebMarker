import express from "express";

import FileNode from "../models/Nodes/FileNode";
import { formatResponseStatus } from "../models/utils";

var router = express.Router();

// api for creating a file
// required fileData and parentFolderId
// fileData: {title}
router.post("/", async function (req, res, next) {
  try {
    const { fileData, parentFolderId } = req.body;
    let result = await FileNode.create(fileData, parentFolderId);
    result = formatResponseStatus(result);
    res.json(result);
  } catch (err) {
    console.log(err);
    err.status = 500;
    res.json(err);
  }
});

export default router;
