import Sequelize from "sequelize";

export default class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.STRING(100),
          unique: true,
          allowNull: false,
        },
        userPw: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        userName: {
          type: Sequelize.STRING(30),
          unique: true,
          allowNull: false,
        },
        serverName: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        profileImg: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        paranoid: false,
        modelName: "User",
        tableName: "user",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Report, {
      foreignKey: "name",
      sourceKey: "userName",
      as: "Report",
      onDelete: "cascade",
    });
    db.User.hasMany(db.Msg, {
      sourceKey: "userName",
      foreignKey: "name",
      as: "Msg",
      onDelete: "cascade",
    });
    db.User.hasMany(db.Comment, {
      as: "Comment",
      sourceKey: "userName",
      foreignKey: "userName",
      onDelete: "cascade",
    });

    db.User.hasMany(db.Board, {
      as: "Board",
      sourceKey: "userName", 
      foreignKey: "userName", 
      onDelete: "cascade",
    });
  }
}
