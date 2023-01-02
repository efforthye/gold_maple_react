import multer from "multer";
import { Router } from "express";
import db from "../models/index.js";
import jwt from "jsonwebtoken";

const router = Router();
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.split(".");
    ext = ext[ext.length - 1];
    cb(null, `${Date.now()}.${ext}`);
  },
});
const upload = multer({ storage: storage });

router.post(
  "/uploadBugReport",
  upload.fields([{ name: "reportFile" }]),
  async (req, res) => {
    try {
      const tempUserInfo = jwt.verify(req.cookies.login, process.env.JWT_KEY);
      global.userName = tempUserInfo.name;
      const tempUser = await db.User.findOne({
        where: {
          userName: global.userName,
        },
      });

      const reportFile = req.files.reportFile[0].filename;
      const { reportTitle, reportSelect, contentsText } = req.body;
      const tempReport = await db.Report.create({
        reportFile: reportFile,
        reportTitle: reportTitle,
        reportSelect: reportSelect,
        contentsText: contentsText,
      });
      tempUser.addReport(tempReport);

      res.send(req.body);
    } catch (err) {
      console.error(err);
      res.send(req.body);
    }
  }
);

router.post("/request", async (req, res) => {
  const tempUserInfo = jwt.verify(req.cookies.login, process.env.JWT_KEY);

  const tempRequest = await db.Report.findAll({
    where: { name: tempUserInfo.name },
    order: [["id", "DESC"]],
  });

  res.send(tempRequest);
});

router.post("/bugcs", async (req, res) => {
  const tempBugcs = await db.Report.findAll({
  });
  res.send(tempBugcs);
});

router.post("/buganswer", async (req, res) => {
  const answer = req.body;
  await db.Report.update(
    {
      reportAnswer: answer.answer,
      reportProcessing: "답변완료",
    },
    {
      where: {
        id: answer.id,
      },
    }
  );
  res.send();
});
export default router;
