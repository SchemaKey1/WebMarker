import express from "express";

import UserNode from "../models/Nodes/UserNode";
import { formatResponseStatus } from "../models/utils";

var router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    let result = await UserNode.getAll();
    result = formatResponseStatus(result);
    res.json(result);
  } catch (err) {
    err.status = 500;
    res.json(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    const userData = req.body;
    let result = await UserNode.create(userData);
    result = formatResponseStatus(result);
    res.json(result);
  } catch (err) {
    err.status = 500;
    res.json(err);
  }
});

router.post("/remove", async function (req, res, next) {
  try {
    const userData = req.body;
    let result = await UserNode.detatchDelete(userData);
    result = formatResponseStatus(result);
    res.json(result);
  } catch (err) {
    err.status = 500;
    res.json(err);
  }
});

router.post("/update", async function (req, res, next) {
  try {
    const userData = req.body;
    let result = await UserNode.update(userData);
    result = formatResponseStatus(result);
    res.json(result);
  } catch (err) {
    err.status = 500;
    res.json(err);
  }
});

export default router;
