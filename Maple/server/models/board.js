import Sequelize, { INTEGER } from "sequelize";

export default class Board extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                title: {
                    type: Sequelize.STRING(255),
                },
                world: {
                    type: Sequelize.STRING(255),
                },
                category: {
                    type: Sequelize.STRING(255),
                },
                tags: {
                    type: Sequelize.STRING(255),
                    allowNull: true,
                },
                contents: {
                    type: Sequelize.TEXT,
                },
                eyeCount: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                },
                likeCount: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                },
                commentCount: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                },
                userWorld: {
                    type: Sequelize.STRING(255),
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
                modelName: "Board",
                tableName: "boards",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }
    static associate(db) {

        db.Board.hasMany(db.Comment, {
            as: "BoardComments",     
            sourceKey: "id",  
            foreignKey: "boardId",  
            onDelete: "cascade",

        });

        db.Board.belongsTo(db.User, {
            targetKey: "userName",
            foreignKey: "userName", 
            onDelete: "cascade",
        });
    }
}
