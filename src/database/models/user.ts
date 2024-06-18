import { DataTypes } from "sequelize";
import sequelize from "../sequelizeClient";
import { IUserModel } from "../../interfaces/users/IUserService";

// Define the User model using sequelize.define()
const User = sequelize.define<IUserModel>('User', {
  // Define the 'username' field with type STRING, allowNull set to false, and unique set to true
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  // Define the 'password' field with type STRING and allowNull set to false
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Define the 'isAdmin' field with type BOOLEAN and defaultValue set to false
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  });

export default User;