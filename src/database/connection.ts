import sequelize from './sequelizeClient';
import './relations';
import Seeder from './seeder';

export const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        const sync = await sequelize.sync({ force: true });
        // const sync = await sequelize.sync();
        console.log('Database & tables created!');

        await Seeder.seed();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
