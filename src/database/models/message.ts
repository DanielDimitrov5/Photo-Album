import { DataTypes } from "sequelize";
import sequelize from "../sequelizeClient";

const Message = sequelize.define('Message', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

export default Message;