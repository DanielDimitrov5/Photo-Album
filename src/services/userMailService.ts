import UserService from "./userService";
import { MailConfig } from "../config/emailConfig";
import Message from "../database/models/message";
import { IUserMailService } from "../interfaces/users/IUserService";

export default class UserMailService extends UserService implements IUserMailService {
    mailConfig: MailConfig;

    constructor(mailConfig: MailConfig) {
        super();
        this.mailConfig = mailConfig;
    }

    // Method to send a message to a user
    async sendMessage(userId: number, title: string, content: string) {
        if (!userId) {
            throw new Error('User not found');
        }

        if (!title || !content) {
            throw new Error('Title and content are required');
        }

        try {
            // Create a new message in the database
            Message.create({ title, content, userId });

            // Send the message using the mail configuration
            this.mailConfig.sendMessage(title, content);

        } catch (error: any) {
            console.error('Error creating message:', error);
            throw new Error(`Error creating message: ${error.message}`);
        }
    }
}
