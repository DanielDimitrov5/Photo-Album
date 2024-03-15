import { DataTypes } from "sequelize";
import { IPhotoModel } from "../../interfaces/photos/IPhotoService";
import sequelize from "../sequelizeClient";

const Photo = sequelize.define<IPhotoModel>('Photo', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Photo;