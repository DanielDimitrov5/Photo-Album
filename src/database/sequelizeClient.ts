import { Sequelize } from 'sequelize';
import { configDotenv } from 'dotenv';

// Load environment variables from .env file
configDotenv();

// Get database configuration from environment variables
const dbName = process.env.DB_NAME || '';
const dbUser = process.env.DB_USER || '';
const dbPassword = process.env.DB_PASSWORD || '';

// Create a new Sequelize instance with the database configuration
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

export default sequelize;