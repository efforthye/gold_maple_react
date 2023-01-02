"use strict";

import Sequelize from "sequelize";

import User from "./user.js";
import Report from "./report.js";

import Board from "./board.js";
import Comment from "./comment.js";

import Admin from "./admin.js";
import Category from "./category.js";
import Helptext from "./helptext.js";
import Helptextchild from "./helptextchild.js";
import Msg from "./msg.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const configJson = require("../config/config.json");
const config = configJson["development"];

const db = {
  User,
  Report,
  Admin,
  Board,
  Comment,
  Category,
  Helptext,
  Helptextchild,
  Msg,
};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

User.init(sequelize);
Report.init(sequelize);

Board.init(sequelize);
Comment.init(sequelize);

Admin.init(sequelize);
Category.init(sequelize);
Helptext.init(sequelize);
Helptextchild.init(sequelize);
Msg.init(sequelize);
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
