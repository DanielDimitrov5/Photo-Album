import { DataTypes } from "sequelize";
import { IPhotoModel } from "../../interfaces/photos/IPhotoService";
import sequelize from "../sequelizeClient";

// Define the 'Photo' model using the sequelize.define() method
const Photo = sequelize.define<IPhotoModel>('Photo', {
    // Define the 'title' attribute of type STRING, which cannot be null
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Define the 'description' attribute of type TEXT, which cannot be null
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    // Define the 'url' attribute of type STRING, which cannot be null
    url: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Photo;