import { Model } from 'sequelize';

export interface IUserService {
    createUser(username: string, password: string): Promise<void>;
    verifyUser(username: string, password: string): Promise<boolean>;
    findUserByUsername(username: string): Promise<IUserModel | null>;
    getUsersWithPhotoCount(page: number, limit: number): Promise<UsersWithPagination>;
    sendMessage(userId: number, title: string, content: string): Promise<void>;
    getLastUsers(count: number): Promise<IUserModel[]>;
    deleteUser(id: number, userId: number): Promise<void>;
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

