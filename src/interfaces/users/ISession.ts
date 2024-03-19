import { SessionData, Session } from "express-session";
import { Request } from 'express';

interface CustomSession extends SessionData, Session {
  userId?: number;
  username?: string;
  isAdmin?: boolean;
}

interface RequestSession extends Request {
  session: CustomSession;
}

export { RequestSession };