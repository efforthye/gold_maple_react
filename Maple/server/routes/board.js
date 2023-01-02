import { Router } from "express";
const router = Router();

import db from "../models/index.js";
import { Op } from "sequelize";
import fs from "fs";
import multer from "multer";
import cloudinary from "cloudinary";

const storage = multer.diskStorage({
  filename: (req, res, callback) => {
    callback(null, Date.now() + file.originalname);
  },
});
const imageFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
    return callback(new Error("이미지 파일만 넣어주세요."), false);
  }
  callback(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter });
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOAD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/create", async (req, res) => {
  try {
    const tempUser = await db.User.findOne({
      where: {
        userName: req.body.userName,
      },
    });
    if (!tempUser) {
      res.send({ status: 401 });
      return;
    }
    const tempBoard = await db.Board.create({
      title: req.body.title,
      world: req.body.world,
      category: req.body.category,
      contents: req.body.contents,
      tags: req.body.tags,
      userWorld: req.body.userWorld,
    });
    tempUser.addBoard(tempBoard);
    res.send({ tempBoard, status: 200 });
  } catch (error) {
    console.log(error);
    res.send({ status: 400 });
  }
});

router.post("/getList", async (req, res) => {
  try {
    const tempBoards = await db.Board.findAll({
      where: {
        category: req.body.category,
      },
      order: [["id", "DESC"]],
    });

    res.send(tempBoards);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

router.post("/getWorldList", async (req, res) => {
  try {
    const tempBoards = await db.Board.findAll({
      where: {
        category: req.body.category,
        world: req.body.world,
      },
      order: [["id", "DESC"]],
    });

    res.send(tempBoards);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

router.post("/getBoard", async (req, res) => {
  try {
    const tempBoard = await db.Board.findAll({
      where: {
        id: req.body.boardId,
      },
    });
    res.send(tempBoard);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

router.post("/destroy", (req, res) => {
  try {
    db.Board.destroy({
      where: { id: req.body.boardId },
    }).then(() => {
      res.send({ status: 200 });
    });
  } catch (err) {
    console.error(err);
    res.send({ status: 400 });
  }
});

router.post("/update", (req, res) => {
  console.log(req.body.title);
  try {
    db.Board.update(
      {
        title: req.body.title,
        world: req.body.world,
        tags: req.body.tags,
        contents: req.body.contents,
      },
      {
        where: { id: req.body.boardId },
      }
    );
    res.send({ status: 200 });
  } catch (err) {
    console.error(err);
    res.send({ status: 400 });
  }
});

router.post("/eyeCountUpdate", async (req, res) => {
  const tempBoard = await db.Board.findOne({
    where: {
      id: req.body.boardId,
    },
  });
  const tempEyeCount = tempBoard.dataValues.eyeCount;
  const newEyeCount = tempEyeCount + 1;
  db.Board.update(
    {
      eyeCount: newEyeCount,
    },
    {
      where: { id: req.body.boardId },
    }
  );
  res.end();
});

router.post("/likeCountUpdate", async (req, res) => {
  const tempBoard = await db.Board.findOne({
    where: {
      id: req.body.boardId,
    },
  });
  const tempLikeCount = tempBoard.dataValues.likeCount;
  const newLikeCount = tempLikeCount + 1;
  db.Board.update(
    {
      likeCount: newLikeCount,
    },
    {
      where: { id: req.body.boardId },
    }
  );
  res.end();
});

router.post("/commentCountUp", async (req, res) => {
  const tempBoard = await db.Board.findOne({
    where: {
      id: req.body.boardId,
    },
  });
  const tempCommentCount = tempBoard.dataValues.commentCount;
  const newCommentCount = tempCommentCount + 1;
  db.Board.update(
    {
      commentCount: newCommentCount,
    },
    {
      where: { id: req.body.boardId },
    }
  );
  res.end();
});
router.post("/commentCountDown", async (req, res) => {
  const tempBoard = await db.Board.findOne({
    where: {
      id: req.body.boardId,
    },
  });
  const tempCommentCount = tempBoard.dataValues.commentCount;
  const newCommentCount = tempCommentCount - 1;
  db.Board.update(
    {
      commentCount: newCommentCount,
    },
    {
      where: { id: req.body.boardId },
    }
  );
  res.end();
});

router.post("/getLikeSevenBoards", async (req, res) => {
  try {
    const tempBoard = await db.Board.findAll({
      order: [["likeCount", "DESC"]],
      limit: 40,
    });
    res.send(tempBoard);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

router.post("/mainCommunity", async (req, res) => {
  try {
    const resultFree = await db.Board.findOne({
      where : {
        category :"자유게시판",

      },
      order :[["createdAt","DESC"]]
    });
    const resultInfo = await db.Board.findOne({
      where : {
        category :"정보게시판"
      },
      order :[["createdAt","DESC"]]
    });
    const resultTopic = await db.Board.findOne({
      where : {
        category :"토론게시판"
      },
      order :[["createdAt","DESC"]]
    });
    const resultNovel = await db.Board.findOne({
      where : {
        category :"연재소설"
      },
      order :[["createdAt","DESC"]]
    });

    res.send({
      status: 200,
      result: [resultFree, resultInfo, resultTopic,resultNovel],
    });
  } catch (error) {
    console.error(error);
    res.send({ status: 400 });
  }
});

router.post("/reportboard", async (req, res) => {
  const tempBoard = await db.Board.findOne({
    where: { id: req.body.id },
  });
  const counting = tempBoard.dataValues.report;
  await db.Board.update(
    {
      report: counting + 1,
    },
    {
      where: { id: req.body.id },
    }
  );
  res.send("성공적으로 신고가 되었습니다.");
});

fs.readFile("./board.json", "utf-8", async function (err, data) {
  const count = await db.Board.count();
  if (err) {
    console.error(err.message);
  } else {
    if (data && JSON.parse(data).length > count) {
      JSON.parse(data).forEach((item) => {
        try {
          db.Board.create(item);
        } catch (err) {
          console.error(err);
        }
      });
    }
  }
});

export default router;









