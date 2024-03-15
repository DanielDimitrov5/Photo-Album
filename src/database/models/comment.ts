import { DataTypes } from "sequelize";
import sequelize from "../sequelizeClient";

const Comment = sequelize.define('Comment', {
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

export default Comment;