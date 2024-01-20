import { Router } from "express";
const router = Router();

import { Op } from "sequelize";
import db from "../models/index.js";

router.post("/mainSearch", async (req, res) => {
  try {
    switch (req.body.searchType) {
      case "제목": {
        const searchResult = await db.Board.findAll({
          where: {
            title: {
              [Op.like]: `%${req.body.searchData}%`,
            },
          },
        });
        res.send({ searchResult: searchResult });
        break;
      }
      case "작성자": {
        const searchResult = await db.Board.findAll({
          where: {
            userName: {
              [Op.like]: `%${req.body.searchData}%`,
            },
          },
        });
        res.send({ searchResult: searchResult });
        break;
      }
      case "태그":
        const searchResult = await db.Board.findAll({
          where: {
            tags: {
              [Op.like]: `%${req.body.searchData}%`,
            },
          },
        });
        res.send({ searchResult: searchResult });
    }
  } catch (error) {
    console.error(error);
    res.send({ status: 400 });
  }
});

export default router;
