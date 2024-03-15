import { SessionData } from "express-session";

interface CustomSession extends SessionData {
    userId?: number;
    username?: string;
    isAdmin?: boolean;
  }

  export { CustomSession };