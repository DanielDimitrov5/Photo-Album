import bcrypt from 'bcrypt';
import User from '../database/models/user';
import { IUserModel, UserWithPhotoCount, TotalUsersResult, UsersWithPagination } from '../interfaces/users/IUserService';
import { IUserService } from '../interfaces/users/IUserService';
import Message from '../database/models/message';
import sequelize from '../database/sequelizeClient';
import { QueryTypes } from 'sequelize';
import { MailConfig } from '../config/emailConfig';

export class UserService implements IUserService {
    mailConfig: MailConfig;

    constructor(mailConfig: MailConfig) {
        this.mailConfig = mailConfig;
    }

    async createUser(username: string, password: string, isAdmin = false) {
        const hashedPassword = await bcrypt.hash(password, 10);
        User.create({ username, password: hashedPassword, isAdmin});
    }

    async verifyUser(username: string, password: string): Promise<boolean> {
        const user = await User.findOne({ where: { username } });
        if (!user) return false;
        return bcrypt.compare(password, user.password);
    }

    async findUserByUsername(username: string): Promise<IUserModel | null> {
        return User.findOne({ where: { username } });
    }

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

    async getLastUsers(count: number): Promise<IUserModel[]> {
        return User.findAll({
            limit: count,
            order: [['createdAt', 'DESC']],
        });
    }

    async sendMessage(userId: number, title: string, content: string) {
        if (!userId) {
            throw new Error('User not found');
        }

        if (!title || !content) {
            throw new Error('Title and content are required');
        }

        try {
            Message.create({ title, content, userId });

            this.mailConfig.sendMessage(title, content);

        } catch (error: any) {
            console.error('Error creating message:', error);
            throw new Error(`Error creating message: ${error.message}`);
        }
    }

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
