import { Router } from 'express';
import db from '../models/index.js';
const router = Router();

const { Comment, User, Board } = db;

router.post('/create', async (req, res) => {
  const { userName, text, userWorld, boardId } = req.body;

  try {
    const createdComment = await Comment.create({
      userName,
      text,
      userWorld,
    });
    const commentUser = await User.findOne({
      where: { userName },
    });
    commentUser.addComment(createdComment);
    const board = await Board.findOne({
      where: { id: boardId },
    });
    board.addBoardComments(createdComment);

    return res.send({ status: 200 });
  } catch (error) {
    console.error(error);
    return res.send({ status: 400 });
  }
});

router.post('/getComment', async (req, res) => {
  const { boardId } = req.body;

  try {
    const nowCommentList = await Comment.findAll({
      where: {
        boardId,
      },
    });
    return res.send(nowCommentList);
  } catch (error) {
    console.error(error);
    return res.send({ status: 400 });
  }
});

router.post('/destroy', async (req, res) => {
  const { commentId } = req.body;

  try {
    await Comment.destroy({
      where: { id: commentId },
    }).then(() => {
      return res.send({ status: 200 });
    });
    return res.end();
  } catch (error) {
    console.error(error);
    return res.send({ status: 400 });
  }
});

router.post('/update', async (req, res) => {
  const { commentText, commentId } = req.body;

  try {
    const updatedComment = await Comment.update(
      {
        text: commentText,
      },
      {
        where: { id: commentId },
      }
    );
    return res.send({ updatedComment });
  } catch (error) {
    console.error(error);
    return res.send({ status: 400 });
  }
});

router.post('/count', async (req, res) => {
  const { boardId } = req.body;

  try {
    const comments = await Comment.findAll({
      where: { boardId },
    });
    return res.send({ number: comments.length });
  } catch (error) {
    console.error(error);
    return res.send({ status: 400 });
  }
});

router.post('/reportcomment', async (req, res) => {
  const { id } = req.body;

  try {
    const comment = await Comment.findOne({
      where: { id },
    });
    const { report } = comment?.dataValues;
    const counting = report;

    await Comment.update(
      {
        report: counting + 1,
      },
      {
        where: { id },
      }
    );
    return res.send('성공적으로 신고가 되었습니다.');
  } catch (error) {
    console.error(error);
    return res.send({ status: 400 });
  }
});

export default router;
