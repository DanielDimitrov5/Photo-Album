import session from 'express-session';
import { configDotenv } from 'dotenv';

configDotenv();

// Configure the session middleware
export const sessionConfig = session({
    secret: process.env.SESSION_SECRET || 'secret', // Set the session secret from the environment variable or use a default value
    resave: false, // Do not save the session if it hasn't been modified
    saveUninitialized: true, // Save uninitialized sessions
});
