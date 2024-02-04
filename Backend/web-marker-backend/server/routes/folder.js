import express from "express";

import FolderNode from "../models/Nodes/FolderNode";
import { formatResponseStatus } from "../models/utils";

var router = express.Router();

// api for creating a folder
// required folderData and parentFolderId
// folderData: {title}
router.post("/", async function (req, res, next) {
  try {
    const { folderData, parentFolderId } = req.body;
    let result = await FolderNode.create(folderData, parentFolderId);
    result = formatResponseStatus(result);
    res.json(result);
  } catch (err) {
    console.log(err);
    err.status = 500;
    res.json(err);
  }
});

export default router;
