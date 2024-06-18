import nodemailer from 'nodemailer';

export class MailConfig {
    private transporter;
    private defaultRecipient: string;

    // Create a MailConfig class to handle email configuration and sending

    constructor() {
        // Create a nodemailer transporter with the SMTP settings
        this.transporter = nodemailer.createTransport({
            host: 'smtp.abv.bg',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER, // Email user (sender)
                pass: process.env.EMAIL_PASSWORD // Email password
            }
        });

        this.defaultRecipient = process.env.EMAIL_USER as string; // Set the default recipient as the email user
    }

    async sendMessage(subject: string, content: string, recipient: string = this.defaultRecipient) {
        // Send an email message with the provided subject, content, and recipient

        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender address
            to: recipient, // Recipient address
            subject: subject, // Email subject
            text: content // Email content
        };

        try {
            const info = await this.transporter.sendMail(mailOptions); // Send the email using the transporter
            console.log('Message sent: %s', info.messageId); // Log the message ID
            return info; // Return the email sending information
        } catch (error) {
            console.error('Failed to send email:', error); // Log the error if sending fails
            throw error; // Throw the error to be handled by the caller
        }
    }
}