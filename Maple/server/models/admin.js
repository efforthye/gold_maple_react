import Sequelize from "sequelize";

export default class Admin extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        adminId: {
          type: Sequelize.STRING(100),
          unique: true,
          allowNull: false,
        },
        adminPw: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        adminName: {
          type: Sequelize.STRING(30),
          unique: true,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "Admin",
        tableName: "admin",
        paranoid: false,

        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
}
