import { Router } from "express";
import db from "../models/index.js";
const router = Router();

router.post("/create", async(req,res)=>{

    try {
        const commentAdd = await db.Comment.create({
            userName : req.body.userName,
            text : req.body.text,
            userWorld : req.body.userWorld
        });
        const commentUserName = await db.User.findOne({
            where : {userName : req.body.userName}
        });
        commentUserName.addComment(commentAdd);
        const boardId = await db.Board.findOne({
            where : {id : req.body.boardId}
        });
        boardId.addBoardComments(commentAdd);

        res.send({status : 200});
        res.end();
    } catch (error) {
        console.error(error);
        res.send({status : 400});
    }
});

router.post("/getComment", async(req,res)=>{
    try {
        const nowCommentList = await db.Comment.findAll({
            where : {
                boardId : req.body.boardId
            }
        });
        res.send(nowCommentList);
        res.end();
    } catch (error) {
        console.error(error);
    }
});

router.post("/destroy", async(req,res)=>{
    try {
        await db.Comment.destroy({
            where : {id : req.body.commentId},
        }).then(()=>{
            res.send({status : 200});
        });
        res.end();
    } catch (error) {
        console.error(error);
        res.send({status : 400});
    }
});

router.post("/update", (req,res)=>{
    try {
        db.Comment.update({
            text : req.body.commentText,
        }, {
            where : {id : req.body.commentId}
        });
        res.end();
    } catch (error) {
        console.error(error);
    }
});

router.post("/count", async(req,res)=>{
    try {
        const comment = await db.Comment.findAll({
            where : {boardId : req.body.boardId}
        });
        res.send({number : comment.length});
    } catch (error) {
        console.error(error);
    }
});

router.post("/reportcomment",async(req,res)=>{
    const tempCommnet= await db.Comment.findOne({
      where:{id:req.body.id}
    })
    const counting = tempCommnet.dataValues.report
    await db.Comment.update({
      report:counting+1,
    },{
      where:{id:req.body.id}
    })
  res.send("성공적으로 신고가 되었습니다.");

  })

export default router;
