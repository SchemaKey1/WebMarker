import express from "express";

import TextNode from "../models/Nodes/DataNodes/TextNode";
import { formatResponseStatus } from "../models/utils";

var router = express.Router();

// api for creating a textNode
// required textData and fileId
// textData: {textContent}
router.post("/text", async function (req, res, next) {
  try {
    const { textData, fileId } = req.body;
    let result = await TextNode.create(textData, fileId);
    result = formatResponseStatus(result);
    res.json(result);
  } catch (err) {
    console.log(err);
    err.status = 500;
    res.json(err);
  }
});

export default router;
