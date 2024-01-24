import express from "express";
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send("hello world");
});

export default router;
