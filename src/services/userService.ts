import bcrypt from 'bcrypt';
import User from '../database/models/user';
import { IUserModel, UserWithPhotoCount, TotalUsersResult, UsersWithPagination } from '../interfaces/users/IUserService';
import { IUserService } from '../interfaces/users/IUserService';
import sequelize from '../database/sequelizeClient';
import { QueryTypes } from 'sequelize';

export default class UserService implements IUserService {

    // Create a new user with the provided username, password, and isAdmin flag
    async createUser(username: string, password: string, isAdmin = false) {
        const hashedPassword = await bcrypt.hash(password, 10);
        User.create({ username, password: hashedPassword, isAdmin});
    }

    // Verify if the provided username and password match a user in the database
    async verifyUser(username: string, password: string): Promise<boolean> {
        const user = await User.findOne({ where: { username } });
        if (!user) return false;
        return bcrypt.compare(password, user.password);
    }

    // Find a user by their username
    async findUserByUsername(username: string): Promise<IUserModel | null> {
        return User.findOne({ where: { username } });
    }

    // Get a paginated list of users with the count of their associated photos
    async getUsersWithPhotoCount(page = 1, limit = 9): Promise<UsersWithPagination> {
        const offset = (page - 1) * limit;

        const usersWithPhotoCount = await sequelize.query(`
            SELECT u.id, u.username, COUNT(p.id) as photoCount
            FROM Users u
            LEFT JOIN Photos p ON u.id = p.userId
            GROUP BY u.id
            ORDER BY photoCount DESC
            LIMIT :limit
            OFFSET :offset
        `, {
            replacements: { limit, offset },
            type: QueryTypes.SELECT,
            mapToModel: true,
        }) as UserWithPhotoCount[];

        const totalUsersResult = await sequelize.query(`
            SELECT COUNT(DISTINCT id) as totalUsers
            FROM Users
        `, { type: QueryTypes.SELECT }) as TotalUsersResult[];

        const totalUsers = totalUsersResult[0].totalUsers;
        const totalPages = Math.ceil(totalUsers / limit);

        return {
            users: usersWithPhotoCount,
            totalPages: totalPages,
        };
    }

    // Get the last N users based on the provided count
    async getLastUsers(count: number): Promise<IUserModel[]> {
        return User.findAll({
            limit: count,
            order: [['createdAt', 'DESC']],
        });
    }

    // Delete a user with the provided ID, only allowed for admin users
    async deleteUser(id: number, userId: number) {
        const user = await User.findByPk(id);
        const currentUser = await User.findByPk(userId);

        if (!user) {
            throw new Error('User not found');
        }

        if (!currentUser?.isAdmin) {
            throw new Error('You are not allowed to delete this user');
        }

        if (user.id === currentUser.id) {
            throw new Error('You cannot delete yourself');
        }
        
        await user.destroy();
    }
}
