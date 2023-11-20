import { Router } from 'express';
import jwt from 'jsonwebtoken';
import Cryptojs from 'crypto-js';
import db from '../models/index.js';
import fs from 'fs';

const router = Router();
const { Admin, Category, Helptext, Helptextchild, User, Board, Comment } = db;
const { JWT_KEY } = process.env;

router.post('/regist', async (req, res) => {
  const { id, password, adminName } = req.body;
  try {
    await Admin.create({
      adminId: id,
      adminPw: Cryptojs.SHA256(password).toString(),
      adminName: adminName,
    }).then((data) => {
      res.send(req.body);
    });
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

router.post('/login', async (req, res) => {
  const { id, password } = req.body;
  try {
    const tempAdmin = await Admin.findOne({
      where: { adminId: id },
    });
    const { dataValues } = tempAdmin;
    const { adminPw, adminId, adminName } = dataValues;
    if (adminPw == Cryptojs.SHA256(password).toString()) {
      res.cookie(
        'admin',
        jwt.sign(
          {
            id: adminId,
            name: adminName,
          },
          JWT_KEY,
          {
            algorithm: 'HS256',
            issuer: 'jjh',
          }
        ),
        { maxAge: 1800000 }
      );
      const name = adminName;
      res.send({
        name: name,
      });
    }
  } catch (err) {
    console.error(err);
    res.end();
  }
});

router.post('/admincheck', (req, res) => {
  const tempAdmin = jwt.verify(req.cookies.admin, JWT_KEY);
  res.send(tempAdmin.name);
});

router.post('/logout', (req, res) => {
  res.clearCookie('admin');
  res.send({ message: '로그아웃' });
});

router.post('/list', async (req, res) => {
  const tempList = await Admin.findAll();
  res.send(tempList);
});

router.post('/delete', async (req, res) => {
  const tempId = req.body;
  await Admin.destroy({
    where: {
      id: tempId.idx,
    },
  });
  res.end();
});

router.post('/category', async (req, res) => {
  try {
    const category = await Category.create({
      category: req.body.text,
    });
    res.end();
  } catch (err) {
    console.error(err);
    res.end();
  }
});

router.post('/addtext', async (req, res) => {
  try {
    const category = await Category.findAll();
    res.send(category);
  } catch (err) {
    console.error(err);
    res.end();
  }
});

router.post('/delcategory', async (req, res) => {
  await Category.destroy({
    where: {
      category: req.body.category,
    },
  });
  res.end();
});

router.post('/editcategory', async (req, res) => {
  await Category.update(
    {
      category: req.body.category,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  );
  res.end();
});

router.post('/helptext', async (req, res) => {
  try {
    const tempHelp = req.body;
    const tempCategory = await Category.findOne({
      where: {
        category: tempHelp.category,
      },
    });
    const tempHelpText = await Helptext.create({
      text: tempHelp.text,
    });
    tempCategory.addHelp(tempHelpText);

    res.end();
  } catch (err) {
    console.error(err);
    res.end();
  }
});

router.post('/deltext', async (req, res) => {
  await Helptext.destroy({
    where: {
      text: req.body.text,
    },
  });
  res.end();
});

router.post('/edittext', async (req, res) => {
  await Helptext.update(
    {
      text: req.body.text,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  );
  res.end();
});

router.post('/addchild', async (req, res) => {
  try {
    const helpText = await Helptext.findAll();
    res.send(helpText);
  } catch (err) {
    console.error(err);
    res.end();
  }
});

router.post('/addchildtext', async (req, res) => {
  try {
    const tempChild = req.body;
    const tempHelpText = await Helptext.findOne({
      where: {
        text: tempChild.category,
      },
    });
    const tempHelpTextChild = await Helptextchild.create({
      textChild: tempChild.text,
    });

    tempHelpText.addChild(tempHelpTextChild);
    res.end();
  } catch (err) {
    console.error(err);
    res.end();
  }
});

router.post('/displaychild', async (req, res) => {
  const textChild = await Helptextchild.findAll({
    include: { model: Helptext },
  });
  res.send(textChild);
});

router.post('/delchild', async (req, res) => {
  await Helptextchild.destroy({
    where: { textChild: req.body.text },
  });
  res.end();
});

router.post('/editchild', async (req, res) => {
  await Helptextchild.update(
    {
      textChild: req.body.text,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  );
  res.end();
});
let globalname;

router.post('/displayuser', async (req, res) => {
  const tempUser = await User.findAll({});

  res.send(tempUser);
});
router.post('/searchuser', async (req, res) => {
  const tempUser = await User.findOne({
    where: { userName: req.body.user },
    include: [
      { model: Board, as: 'Board' },
      { model: Comment, as: 'Comment' },
    ],
  });

  res.send(tempUser);
});

router.post('/deluser', async (req, res) => {
  await User.destroy({
    where: { userName: req.body.userName },
  });
  res.send('성공적으로삭제함.');
});

router.post('/sendmsg', async (req, res) => {
  const tempUser = await User.findOne({
    where: { userName: req.body.userName },
  });
  const tempMsg = await Msg.create({
    text: req.body.msg,
  });
  tempUser.addMsg(tempMsg);
  res.end();
});

router.post('/deluserboard', async (req, res) => {
  await Board.destroy({
    where: {
      id: req.body.id,
    },
  });
  const tempUser = await User.findOne({
    where: { userName: req.body.user },
    include: [
      { model: Board, as: 'Board' },
      { model: Comment, as: 'Comment' },
    ],
  });

  res.send({ tempUser, msg: '성공적으로지워졌습니다.' });
});
router.post('/delusercomment', async (req, res) => {
  await Comment.update(
    {
      text: '관리자에 의해 해당 댓글은 삭제되었습니다.',
    },
    {
      where: {
        id: req.body.id,
      },
    }
  );
  const tempUser = await User.findOne({
    where: { userName: req.body.user },
    include: [
      { model: Board, as: 'Board' },
      { model: Comment, as: 'Comment' },
    ],
  });

  res.send({ tempUser, msg: '성공적으로지워졌습니다.' });
});

router.post('/reportboard', async (req, res) => {
  const tempReport = await Board.findAll({});
  res.send(tempReport);
});

router.post('/reportcomment', async (req, res) => {
  const tempReport = await Comment.findAll({});
  res.send(tempReport);
});

router.post('/changefirst', async (req, res) => {
  const changeFrom = req.body.changeFromArr;
  const changeTo = req.body.changeToArr;

  await Category.update(
    {
      id: 100,
    },
    {
      where: {
        category: changeFrom.category,
      },
    }
  );
  await Category.update(
    {
      id: 200,
    },
    {
      where: {
        category: changeTo.category,
      },
    }
  );

  await Category.update(
    {
      id: changeFrom.id,
    },
    {
      where: {
        category: changeTo.category,
      },
    }
  );
  await Category.update(
    {
      id: changeTo.id,
    },
    {
      where: {
        category: changeFrom.category,
      },
    }
  );

  res.send('성공적으로 바꿨습니다.');
});

router.post('/changesecond', async (req, res) => {
  const changeFrom = req.body.changeFromArr;
  const changeTo = req.body.changeToArr;
  await Helptext.update(
    {
      id: 1000000,
    },
    {
      where: {
        text: changeFrom.category,
      },
    }
  );
  await Helptext.update(
    {
      id: 1000001,
    },
    {
      where: {
        text: changeTo.category,
      },
    }
  );

  await Helptext.update(
    {
      id: changeFrom.id,
    },
    {
      where: {
        text: changeTo.category,
      },
    }
  );
  await Helptext.update(
    {
      id: changeTo.id,
    },
    {
      where: {
        text: changeFrom.category,
      },
    }
  );
  res.send('성공적으로 바꿨습니다.');
});

router.post('/changethird', async (req, res) => {
  const changeFrom = req.body.changeFromArr;
  const changeTo = req.body.changeToArr;
  await Helptextchild.update(
    {
      id: 1000000,
    },
    {
      where: {
        textChild: changeFrom.category,
      },
    }
  );
  await Helptextchild.update(
    {
      id: 1000001,
    },
    {
      where: {
        textChild: changeTo.category,
      },
    }
  );

  await Helptextchild.update(
    {
      id: changeFrom.id,
    },
    {
      where: {
        textChild: changeTo.category,
      },
    }
  );
  await Helptextchild.update(
    {
      id: changeTo.id,
    },
    {
      where: {
        textChild: changeFrom.category,
      },
    }
  );
  res.send('성공적으로 바꿨습니다.');
});

// 여기, 서버 인덱스로 빼기
// fs.readFile('./admin.json', 'utf-8', async function (err, data) {
//     const count = await Admin.count();
//     if (err) {
//         console.error(err.message);
//     } else {
//         if (data && JSON.parse(data).length > count) {
//             JSON.parse(data).forEach((item) => {
//                 try {
//                     Admin.create(item);
//                 } catch (err) {
//                     console.error(err);
//                 }
//             });
//         }
//     }
// });

export default router;
