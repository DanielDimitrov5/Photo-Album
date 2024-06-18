import { Response, NextFunction } from 'express';
import { RequestSession } from '../../interfaces/users/ISession';

// Middleware function to handle session data
const sessionMiddleware = (req: RequestSession, res: Response, next: NextFunction) => {
    // Check if the session has a username
    if (req.session.username) {
        // If username exists, set it in res.locals for easy access in subsequent middleware or routes
        res.locals.username = req.session.username;
        // Set isAdmin flag in res.locals based on session data
        res.locals.isAdmin = req.session.isAdmin;
        // Set userId in res.locals based on session data
        res.locals.userId = req.session.userId;
    }     
    // Call the next middleware or route handler
    next();
}

export default sessionMiddleware;