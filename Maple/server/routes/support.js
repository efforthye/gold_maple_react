import { Router } from "express";
import db from "../models/index.js";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/displaycategory", async (req, res) => {
  const tempCategory = await db.Category.findAll({
    include: [
      {
        model: db.Helptext,
        as: "Help",
        include: [
          {
            model: db.Helptextchild,

            as: "Child",
          },
        ],
      },
    ],

    order: [
      ["id", "ASC"],
      [{ model: db.Helptext, as: "Help" }, "id", "ASC"],
      [
        { model: db.Helptext, as: "Help" },
        { model: db.Helptextchild, as: "Child" },
        "id",
        "ASC",
      ],
    ],
  });

  res.send(tempCategory);
});

router.post("/displaymsg", async (req, res) => {
  const tempUserInfo = jwt.verify(req.cookies.login, process.env.JWT_KEY);
  const tempMsg = await db.Msg.findAll({
    where: {
      name: tempUserInfo.name,
    },
    order: [["id", "DESC"]],
  });
  res.send(tempMsg);
});

export default router;
