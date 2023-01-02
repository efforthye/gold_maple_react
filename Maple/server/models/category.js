import Sequelize from "sequelize";

export default class Category extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        category: {
          type: Sequelize.STRING(255),
          unique: true,
          allowNull: false,
        },
      
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "Category",
        tableName: "category",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.Category.hasMany(db.Helptext, {
      foreignKey: "helpCategory",
      sourceKey: "category",
      as: "Help",
      onDelete: "cascade",
    });
  }
}
