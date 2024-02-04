import express from "express";
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send("Welcome to Zulu app");
});

export default router;
