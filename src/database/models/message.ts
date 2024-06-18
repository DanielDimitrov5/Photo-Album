import { DataTypes } from "sequelize";
import sequelize from "../sequelizeClient";

// Define the Message model using sequelize.define()
const Message = sequelize.define('Message', {
    // Define the 'title' attribute with type STRING and allowNull set to false
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Define the 'content' attribute with type TEXT and allowNull set to false
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

export default Message;