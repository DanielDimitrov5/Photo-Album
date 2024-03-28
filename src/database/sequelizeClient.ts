import { Sequelize } from 'sequelize';
import { configDotenv } from 'dotenv';
configDotenv();

const dbName = process.env.DB_NAME || '';
const dbUser = process.env.DB_USER || '';
const dbPassword = process.env.DB_PASSWORD || '';

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

export default sequelize;