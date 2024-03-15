import sequelize from './sequelizeClient';
import './relations';
import Seeder from './seeder';

export const initializeDatabase = async () => {
    sequelize.authenticate()
        .then(() => console.log('Connection has been established successfully.'))
        .catch((err: Error) => console.error('Unable to connect to the database:', err));

    try {
        const sync = await sequelize.sync({ force: true });
        // const sync = await sequelize.sync();
        console.log('Database & tables created!');
        await Seeder.seed();
    } catch (error) {
        console.error('Error creating database & tables:', error);
    }
};
