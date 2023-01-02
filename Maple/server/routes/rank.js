import { Router } from "express";
import db from "../models/index.js";

const router = Router();

router.post("/viewBoard", (req, res) => {
  const tempArr = [];
  let tempUserName = "";
  db.Board.findAll({ order: [["userName", "DESC"]] }).then((data) => {
    data.map((item) => {
      if (tempUserName != item.dataValues.userName) {
        tempUserName = item.dataValues.userName;
        tempArr.push({
          tempUserName: tempUserName,
          count: 1,
          userWorld: item.dataValues.userWorld,
          profileImg: "",
        });
      } else {
        tempArr[tempArr.length - 1].count += 1;
      }
    });
    tempArr.sort((a, b) => b.count - a.count);
    let count = 0;
    for (let i = 0; i < tempArr.length; i++) {
      db.User.findOne({ where: { userName: tempArr[i].tempUserName } }).then(
        (data) => {
          count++;
          tempArr[i].profileImg = data.dataValues.profileImg;
        }
      );
    }
    const intervalId = setInterval(() => {
      if (tempArr.length <= count) {
        clearInterval(intervalId);
        res.send(tempArr);
      }
    }, 100);
  });
});

router.post("/viewComment", (req, res) => {
  const tempArr = [];
  let tempUserName = "";
  db.Comment.findAll({ order: [["userName", "DESC"]] }).then((data) => {
    data.map((item) => {
      if (tempUserName != item.dataValues.userName) {
        tempUserName = item.dataValues.userName;
        tempArr.push({
          tempUserName: tempUserName,
          count: 1,
          userWorld: item.dataValues.userWorld,
          profileImg: "",
        });
      } else {
        tempArr[tempArr.length - 1].count += 1;
      }
    });
    tempArr.sort((a, b) => b.count - a.count);
    let count = 0;
    for (let i = 0; i < tempArr.length; i++) {
      db.User.findOne({ where: { userName: tempArr[i].tempUserName } }).then(
        (data) => {
          count++;
          tempArr[i].profileImg = data.dataValues.profileImg;
        }
      );
    }
    const intervalId = setInterval(() => {
      if (tempArr.length <= count) {
        clearInterval(intervalId);
        res.send(tempArr);
      }
    }, 100);
  });
});

router.post("/total", (req, res) => {
  const tempArr = [];
  let tempUserName = "";
  db.Board.findAll({ order: [["userName", "DESC"]] })
    .then((data) => {
      data.map((item) => {
        if (tempUserName != item.dataValues.userName) {
          tempUserName = item.dataValues.userName;
          tempArr.push({
            tempUserName: tempUserName,
            count: 3,
            userWorld: item.dataValues.userWorld,
            profileImg: "",
          });
        } else {
          tempArr[tempArr.length - 1].count += 3;
        }
      });
      return tempArr;
    })
    .then((tempArr) => {
      db.Comment.findAll({ order: [["userName", "DESC"]] })
        .then((data) => {
          data.map((item) => {
            let commentUserName = item.dataValues.userName;
            let findUser = false;
            tempArr.map((boardItem) => {
              if (boardItem.tempUserName == commentUserName) {
                findUser = true;
                boardItem.count += 1;
              }
            });
            if (!findUser) {
              tempArr.push({
                tempUserName: commentUserName,
                count: 1,
                userWorld: item.dataValues.userWorld,
                profileImg: "",
              });
            }
          }); 
          return tempArr;
        })
        .then((tempArr) => {
          tempArr.sort((a, b) => b.count - a.count);
          let count = 0;
          for (let i = 0; i < tempArr.length; i++) {
            db.User.findOne({
              where: { userName: tempArr[i].tempUserName },
            }).then((data) => {
              count++;
              tempArr[i].profileImg = data.dataValues.profileImg;
            });
          }
          const intervalId = setInterval(() => {
            if (tempArr.length <= count) {
              clearInterval(intervalId);
              res.send(tempArr);
            }
          }, 100);
        });
    });
});

router.post("/totalServer", (req, res) => {
  const tempArr = [];
  let tempUserName = "";
  db.Board.findAll({
    where: { userWorld: req.body.server },
    order: [["userName", "DESC"]],
  })
    .then((data) => {
      data.map((item) => {
        if (tempUserName != item.dataValues.userName) {
          tempUserName = item.dataValues.userName;
          tempArr.push({
            tempUserName: tempUserName,
            count: 3,
            userWorld: item.dataValues.userWorld,
            profileImg: "",
          });
        } else {
          tempArr[tempArr.length - 1].count += 3;
        }
      });
      return tempArr;
    })
    .then((tempArr) => {
      db.Comment.findAll({
        where: { userWorld: req.body.server },
        order: [["userName", "DESC"]],
      })
        .then((data) => {
          data.map((item) => {
            let commentUserName = item.dataValues.userName;
            let findUser = false;
            tempArr.map((boardItem) => {
              if (boardItem.tempUserName == commentUserName) {
                findUser = true;
                boardItem.count += 1;
              }
            });
            if (!findUser) {
              tempArr.push({
                tempUserName: commentUserName,
                count: 1,
                userWorld: item.dataValues.userWorld,
                profileImg: "",
              });
            }
          }); 
          return tempArr;
        })
        .then((tempArr) => {
          tempArr.sort((a, b) => b.count - a.count);
          let count = 0;
          for (let i = 0; i < tempArr.length; i++) {
            db.User.findOne({
              where: { userName: tempArr[i].tempUserName },
            }).then((data) => {
              count++;
              tempArr[i].profileImg = data.dataValues.profileImg;
            });
          }
          const intervalId = setInterval(() => {
            if (tempArr.length <= count) {
              clearInterval(intervalId);
              res.send(tempArr);
            }
          }, 100);
        });
    });
});

router.post("/searchTotal", (req, res) => {
  const tempArr = [];
  let tempUserName = "";
  db.Board.findAll({
    where: { userName: req.body.searchData },
    order: [["userName", "DESC"]],
  })
    .then((data) => {
      data.map((item) => {
        if (tempUserName != item.dataValues.userName) {
          tempUserName = item.dataValues.userName;
          tempArr.push({
            tempUserName: tempUserName,
            count: 3,
            userWorld: item.dataValues.userWorld,
            profileImg: "",
          });
        } else {
          tempArr[tempArr.length - 1].count += 3;
        }
      });
      return tempArr;
    })
    .then((tempArr) => {
      db.Comment.findAll({
        where: { userName: req.body.searchData },
        order: [["userName", "DESC"]],
      })
        .then((data) => {
          data.map((item) => {
            let commentUserName = item.dataValues.userName;
            let findUser = false;
            tempArr.map((boardItem) => {
              if (boardItem.tempUserName == commentUserName) {
                findUser = true;
                boardItem.count += 1;
              }
            });
            if (!findUser) {
              tempArr.push({
                tempUserName: commentUserName,
                count: 1,
                userWorld: item.dataValues.userWorld,
                profileImg: "",
              });
            }
          });
          return tempArr;
        })
        .then((tempArr) => {
          tempArr.sort((a, b) => b.count - a.count);
          let count = 0;
          for (let i = 0; i < tempArr.length; i++) {
            db.User.findOne({
              where: { userName: tempArr[i].tempUserName },
            }).then((data) => {
              count++;
              tempArr[i].profileImg = data.dataValues.profileImg;
            });
          }
          const intervalId = setInterval(() => {
            if (tempArr.length <= count) {
              clearInterval(intervalId);
              res.send(tempArr);
            }
          }, 100);
        });
    });
});

router.post("/boardServer", (req, res) => {
  const tempArr = [];
  let tempUserName = "";
  db.Board.findAll({
    where: { userWorld: req.body.server },
    order: [["userName", "DESC"]],
  }).then((data) => {
    data.map((item) => {
      if (tempUserName != item.dataValues.userName) {
        tempUserName = item.dataValues.userName;
        tempArr.push({
          tempUserName: tempUserName,
          count: 1,
          userWorld: item.dataValues.userWorld,
          profileImg: "",
        });
      } else {
        tempArr[tempArr.length - 1].count += 1;
      }
    });
    tempArr.sort((a, b) => b.count - a.count);
    let count = 0;
    for (let i = 0; i < tempArr.length; i++) {
      db.User.findOne({ where: { userName: tempArr[i].tempUserName } }).then(
        (data) => {
          count++;
          tempArr[i].profileImg = data.dataValues.profileImg;
        }
      );
    }
    const intervalId = setInterval(() => {
      if (tempArr.length <= count) {
        clearInterval(intervalId);
        res.send(tempArr);
      }
    }, 100);
  });
});

router.post("/searchBoard", (req, res) => {
  const tempArr = [];
  let tempUserName = "";
  db.Board.findAll({
    where: { userName: req.body.searchData },
    order: [["userName", "DESC"]],
  }).then((data) => {
    data.map((item) => {
      if (tempUserName != item.dataValues.userName) {
        tempUserName = item.dataValues.userName;
        tempArr.push({
          tempUserName: tempUserName,
          count: 1,
          userWorld: item.dataValues.userWorld,
          profileImg: "",
        });
      } else {
        tempArr[tempArr.length - 1].count += 1;
      }
    });
    tempArr.sort((a, b) => b.count - a.count);
    let count = 0;
    for (let i = 0; i < tempArr.length; i++) {
      db.User.findOne({ where: { userName: tempArr[i].tempUserName } }).then(
        (data) => {
          count++;
          tempArr[i].profileImg = data.dataValues.profileImg;
        }
      );
    }
    const intervalId = setInterval(() => {
      if (tempArr.length <= count) {
        clearInterval(intervalId);
        res.send(tempArr);
      }
    }, 100);
  });
});

router.post("/commentServer", (req, res) => {
  const tempArr = [];
  let tempUserName = "";
  db.Comment.findAll({
    where: { userWorld: req.body.server },
    order: [["userName", "DESC"]],
  }).then((data) => {
    data.map((item) => {
      if (tempUserName != item.dataValues.userName) {
        tempUserName = item.dataValues.userName;
        tempArr.push({
          tempUserName: tempUserName,
          count: 1,
          userWorld: item.dataValues.userWorld,
          profileImg: "",
        });
      } else {
        tempArr[tempArr.length - 1].count += 1;
      }
    });
    tempArr.sort((a, b) => b.count - a.count);
    let count = 0;
    for (let i = 0; i < tempArr.length; i++) {
      db.User.findOne({ where: { userName: tempArr[i].tempUserName } }).then(
        (data) => {
          count++;
          tempArr[i].profileImg = data.dataValues.profileImg;
        }
      );
    }
    const intervalId = setInterval(() => {
      if (tempArr.length <= count) {
        clearInterval(intervalId);
        res.send(tempArr);
      }
    }, 100);
  });
});

router.post("/searchComment", (req, res) => {
  const tempArr = [];
  let tempUserName = "";
  db.Comment.findAll({
    where: { userName: req.body.searchData },
    order: [["userName", "DESC"]],
  }).then((data) => {
    data.map((item) => {
      if (tempUserName != item.dataValues.userName) {
        tempUserName = item.dataValues.userName;
        tempArr.push({
          tempUserName: tempUserName,
          count: 1,
          userWorld: item.dataValues.userWorld,
          profileImg: "",
        });
      } else {
        tempArr[tempArr.length - 1].count += 1;
      }
    });
    tempArr.sort((a, b) => b.count - a.count);
    let count = 0;
    for (let i = 0; i < tempArr.length; i++) {
      db.User.findOne({ where: { userName: tempArr[i].tempUserName } }).then(
        (data) => {
          count++;
          tempArr[i].profileImg = data.dataValues.profileImg;
        }
      );
    }
    const intervalId = setInterval(() => {
      if (tempArr.length <= count) {
        clearInterval(intervalId);
        res.send(tempArr);
      }
    }, 100);
  });
});

export default router;
