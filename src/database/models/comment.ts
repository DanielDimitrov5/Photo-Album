import { DataTypes } from "sequelize";
import sequelize from "../sequelizeClient";

// Define the Comment model
const Comment = sequelize.define('Comment', {
    content: {
        type: DataTypes.TEXT, // The content of the comment, stored as text
        allowNull: false // The content cannot be null or empty
    }
});

export default Comment;
