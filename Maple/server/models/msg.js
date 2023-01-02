import Sequelize from "sequelize";

export default class Msg extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        text: {
          type: Sequelize.TEXT,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "Msg",
        tableName: "msg",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.Msg.belongsTo(db.User, {
      foreingKey: "name",
      targetKey: "userName",
      onDelete: "cascade",
    });
  }
}
