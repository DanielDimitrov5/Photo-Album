import { Request, Response, NextFunction } from 'express';
import { CustomSession } from '../../interfaces/users/ISession';

const isLoggedIn = (req: Request & { session: CustomSession }, res: Response, next: NextFunction) => {
    if (req.session.username) {
        next();
    } else {
        res.redirect('/users/login');
    }
}

const isGuest = (req: Request & { session: CustomSession }, res: Response, next: NextFunction) => {
    if (!req.session.username) {
        next();
    } else {
        res.redirect('/');
    }
}

const isAdmin = (req: Request & { session: CustomSession }, res: Response, next: NextFunction) => {
    if (req.session.username && req.session.isAdmin) {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
}

export { isLoggedIn, isGuest, isAdmin };