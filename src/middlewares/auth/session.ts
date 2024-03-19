import { Response, NextFunction } from 'express';
import { RequestSession } from '../../interfaces/users/ISession';

const sessionMiddleware = (req: RequestSession, res: Response, next: NextFunction) => {
    if (req.session.username) {
        res.locals.username = req.session.username;
        res.locals.isAdmin = req.session.isAdmin;
        res.locals.userId = req.session.userId;
    }     
    next();
}

export default sessionMiddleware;