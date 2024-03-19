import { Model } from 'sequelize';
import { MailConfig } from '../../config/emailConfig';

export interface IUserService {
    createUser(username: string, password: string): Promise<void>;
    verifyUser(username: string, password: string): Promise<boolean>;
    findUserByUsername(username: string): Promise<IUserModel | null>;
    getUsersWithPhotoCount(page: number, limit: number): Promise<UsersWithPagination>;
    getLastUsers(count: number): Promise<IUserModel[]>;
    deleteUser(id: number, userId: number): Promise<void>;
}

export interface IUserMailService extends IUserService {
    mailConfig: MailConfig;
    sendMessage(userId: number, title: string, content: string): Promise<void>;
}

export interface IUserModel extends Model {
    id: number;
    username: string;
    password: string;
    isAdmin: boolean;
}

export interface TotalUsersResult {
    totalUsers: number;
}

export interface UserWithPhotoCount {
    id: number;
    username: string;
    photoCount: number;
}

export interface UsersWithPagination {
    users: UserWithPhotoCount[];
    totalPages: number;
}

