import Sequelize from "sequelize";

export default class Helptextchild extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        textChild: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
     
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "Helptextchild",
        tableName: "helptextchild",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.Helptextchild.belongsTo(db.Helptext, {
      foreignKey: "textCategory",
      targetKey: "text",
      onDelete: "cascade",
    });
  }
}
