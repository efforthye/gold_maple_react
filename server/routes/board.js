import { Router } from 'express';
const router = Router();

import db from '../models/index.js';
import { Op } from 'sequelize';
import fs from 'fs';
import multer from 'multer';
import cloudinary from 'cloudinary';

const { CLOUDINARY_CLOAD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
const { User, Board } = db;

const storage = multer.diskStorage({
  filename: (req, res, callback) => {
    callback(null, Date.now() + file.originalname);
  },
});
const imageFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
    return callback(new Error('이미지 파일만 넣어주세요.'), false);
  }
  callback(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter });
cloudinary.config({
  cloud_name: CLOUDINARY_CLOAD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

router.post('/create', async (req, res) => {
  const { userName, title, world, category, contents, tags, userWorld } = req.body;

  try {
    const user = await User.findOne({
      where: {
        userName,
      },
    });
    if (!user) return res.send({ status: 401 });

    const board = await Board.create({
      title,
      world,
      category,
      contents,
      tags,
      userWorld,
    });
    user.addBoard(board);
    return res.send({ tempBoard: board, status: 200 });
  } catch (error) {
    console.log(error);
    return res.send({ status: 400 });
  }
});

router.post('/getList', async (req, res) => {
  const { category } = req.body;

  try {
    const boards = await Board.findAll({
      where: {
        category,
      },
      order: [['id', 'DESC']],
    });

    return res.send(boards);
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
});

router.post('/getWorldList', async (req, res) => {
  const { category, world } = req.body;

  try {
    const tempBoards = await Board.findAll({
      where: {
        category,
        world,
      },
      order: [['id', 'DESC']],
    });

    return res.send(tempBoards);
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
});

router.post('/getBoard', async (req, res) => {
  const { boardId } = req.body;

  try {
    const board = await Board.findAll({
      where: {
        id: boardId,
      },
    });
    return res.send(board);
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
});

router.post('/destroy', (req, res) => {
  const { boardId } = req.body;

  try {
    Board.destroy({
      where: { id: boardId },
    }).then(() => {
      return res.send({ status: 200 });
    });
  } catch (err) {
    console.error(err);
    return res.send({ status: 400 });
  }
});

router.post('/update', (req, res) => {
  const { title, world, tags, contents, boardId } = req.body;
  console.log(title);

  try {
    Board.update(
      {
        title,
        world,
        tags,
        contents,
      },
      {
        where: { id: boardId },
      }
    );
    res.send({ status: 200 });
  } catch (err) {
    console.error(err);
    res.send({ status: 400 });
  }
});

router.post('/eyeCountUpdate', async (req, res) => {
  const { boardId } = req.body;

  try {
    const board = await Board.findOne({
      where: {
        id: boardId,
      },
    });
    const { dataValues } = board;
    const { eyeCount } = dataValues;

    const updatedBoard = await Board.update(
      {
        eyeCount: eyeCount + 1,
      },
      {
        where: { id: boardId },
      }
    );
    return res.send({ updatedBoard });
  } catch (error) {
    console.log(error);
    return res.send({ status: 400 });
  }
});

router.post('/likeCountUpdate', async (req, res) => {
  const { boardId } = req.body;

  try {
    const board = await Board.findOne({
      where: {
        id: boardId,
      },
    });
    const { likeCount } = board?.dataValues;

    const updatedBoard = await Board.update(
      {
        likeCount: likeCount + 1,
      },
      {
        where: { id: boardId },
      }
    );
    return res.send({ updatedBoard });
  } catch (error) {
    console.log(error);
    return res.send({ status: 400 });
  }
});

router.post('/commentCountUp', async (req, res) => {
  const { boardId } = req.body;

  try {
    const board = await Board.findOne({
      where: {
        id: boardId,
      },
    });
    const { commentCount } = board?.dataValues;

    Board.update(
      {
        commentCount: commentCount + 1,
      },
      {
        where: { id: boardId },
      }
    );
    res.end();
  } catch (error) {
    console.log(error);
    return res.send({ status: 400 });
  }
});
router.post('/commentCountDown', async (req, res) => {
  const { boardId } = req.body;

  try {
    const board = await Board.findOne({
      where: {
        id: boardId,
      },
    });
    const { commentCount } = board?.dataValues;

    const updatedBoard = await Board.update(
      {
        commentCount: commentCount - 1,
      },
      {
        where: { id: boardId },
      }
    );
    return res.send({ updatedBoard });
  } catch (error) {
    console.log(error);
    return res.send({ status: 400 });
  }
});

router.post('/getLikeSevenBoards', async (req, res) => {
  try {
    const boards = await Board.findAll({
      order: [['likeCount', 'DESC']],
      limit: 40,
    });
    return res.send(boards);
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
});

router.post('/mainCommunity', async (req, res) => {
  try {
    const resultFree = await Board.findOne({
      where: {
        category: '자유게시판',
      },
      order: [['createdAt', 'DESC']],
    });
    const resultDev = await Board.findOne({
      where: {
        category: '개발게시판',
      },
      order: [['createdAt', 'DESC']],
    });
    const resultInfo = await Board.findOne({
      where: {
        category: '정보게시판',
      },
      order: [['createdAt', 'DESC']],
    });
    const resultNovel = await Board.findOne({
      where: {
        category: '연재소설',
      },
      order: [['createdAt', 'DESC']],
    });
    const resultArt = await Board.findOne({
      where: {
        category: '금쪽이아트',
      },
      order: [['createdAt', 'DESC']],
    });

    return res.send({
      status: 200,
      result: [resultFree, resultDev, resultInfo, resultNovel, resultArt],
    });
  } catch (error) {
    console.error(error);
    return res.send({ status: 400 });
  }
});

router.post('/reportboard', async (req, res) => {
  const { id } = req.body;

  try {
    const board = await Board.findOne({
      where: { id },
    });
    const { report } = board?.dataValues;
    const counting = report;

    await Board.update(
      {
        report: counting + 1,
      },
      {
        where: { id },
      }
    );
    res.send('성공적으로 신고가 되었습니다.');
  } catch (error) {
    console.error(error);
    return res.send({ status: 400 });
  }
});

// 여기, 서버 인덱스로 빼기
// fs.readFile("./board.json", "utf-8", async function (err, data) {
//   const count = await Board.count();
//   if (err) {
//     console.error(err.message);
//   } else {
//     if (data && JSON.parse(data).length > count) {
//       JSON.parse(data).forEach((item) => {
//         try {
//           Board.create(item);
//         } catch (err) {
//           console.error(err);
//         }
//       });
//     }
//   }
// });

export default router;
