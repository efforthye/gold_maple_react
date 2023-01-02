import Sequelize from "sequelize";

export default class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        text: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        icon: {
          type: Sequelize.STRING(255),
          allowNull: true,
          defaultValue: null,
        },
        replyCommentId: {
          type: Sequelize.STRING(255),
          allowNull: true,
          defaultValue: null,
        },
        replyUserName: {
          type: Sequelize.STRING(255),
          allowNull: true,
          defaultValue: null,
        },
        userWorld: {
          type: Sequelize.STRING(255),
          allowNull: false,
          defaultValue: "리부트2",
        },
        report:{
          type:Sequelize.INTEGER,
          defaultValue: 0,
      }

      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "Comment",
        tableName: "comments",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.Comment.belongsTo(db.Board, {
      foreignKey: "boardId",
      targetKey: "id",
      onDelete: "cascade",
    });

    db.Comment.belongsTo(db.User, {
      foreignKey: "userName",
      targetKey: "userName",
      onDelete: "cascade",
    });
  }
}
