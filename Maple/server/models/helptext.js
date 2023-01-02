import Sequelize from "sequelize";

export default class Helptext extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        text: {
          type: Sequelize.STRING(255),
          unique: true,
          allowNull: false,
        },
   
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "Helptext",
        tableName: "helptext",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.Helptext.belongsTo(db.Category, {
      foreignKey: "helpCategory",
      targetKey: "category",
      onDelete: "cascade",
    });
    db.Helptext.hasMany(db.Helptextchild, {
      foreignKey: "textCategory",
      sourceKey: "text",
      as: "Child",
      onDelete: "cascade",
    });
  }
}
