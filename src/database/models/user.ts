import { DataTypes } from "sequelize";
import sequelize from "../sequelizeClient";
import { IUserModel } from "../../interfaces/users/IUserService";

const User = sequelize.define<IUserModel>('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

export default User;