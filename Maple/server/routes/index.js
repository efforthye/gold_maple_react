import { Router } from "express";

import user from "./user.js";

import report from "./report.js";
import board from "./board.js";
import comment from "./comment.js";

import admin from "./admin.js";
import support from "./support.js";
import rank from "./rank.js";
import search from "./search.js";
import fs from "fs";
const router = Router();

router.use("/user", user);
router.use("/board", board);
router.use("/comment", comment);
router.use("/admin", admin);
router.use("/report", report);
router.use("/support", support);
router.use("/rank", rank);

router.use("/search", search);
function changeImg() {
  fs.readdir("./upload", (err, datas) => {
    for (let i = 0; i < datas.length; i++) {
      router.get(`/download${datas[i]}`, (req, res) => {
        fs.readFile("./upload/" + datas[i], (err, data) => {
          res.writeHead(200, { "Content-Type": "img/jpeg; charset=utf-8" });

          res.end(data);
        });
      });
    }
  });
}
changeImg();

export default router;
