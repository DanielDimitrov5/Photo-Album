import { Response, NextFunction } from 'express';
import { RequestSession } from '../../interfaces/users/ISession';

const isLoggedIn = (req: RequestSession, res: Response, next: NextFunction) => {
    if (req.session.username) {
        next();
    } else {
        res.redirect('/users/login');
    }
}

const isGuest = (req: RequestSession, res: Response, next: NextFunction) => {
    if (!req.session.username) {
        next();
    } else {
        res.redirect('/');
    }
}

const isAdmin = (req: RequestSession, res: Response, next: NextFunction) => {
    if (req.session.username && req.session.isAdmin) {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
}

export { isLoggedIn, isGuest, isAdmin };