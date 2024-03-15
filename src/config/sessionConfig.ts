import session from 'express-session';
import { configDotenv } from 'dotenv';

configDotenv();

export const sessionConfig = session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
});
