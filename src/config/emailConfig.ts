import nodemailer from 'nodemailer';

export class MailConfig {
    private transporter;
    private defaultRecipient: string;

    //Outgoing Server (Изходящ сървър SMTP): smtp.abv.bg – port: 465 TLS/SSL

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.abv.bg',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        this.defaultRecipient = process.env.EMAIL_USER as string;
    }

    async sendMessage(subject: string, content: string, recipient: string = this.defaultRecipient) {
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender address
            to: recipient,
            subject: subject,
            text: content
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Message sent: %s', info.messageId);
            return info;
        } catch (error) {
            console.error('Failed to send email:', error);
            throw error;
        }
    }
}