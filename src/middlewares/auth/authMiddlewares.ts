import { Response, NextFunction } from 'express';
import { RequestSession } from '../../interfaces/users/ISession';

// Middleware to check if the user is logged in
const isLoggedIn = (req: RequestSession, res: Response, next: NextFunction) => {
    if (req.session.username) {
        next(); // User is logged in, proceed to the next middleware or route handler
    } else {
        res.redirect('/users/login'); // User is not logged in, redirect to the login page
    }
}

// Middleware to check if the user is a guest (not logged in)
const isGuest = (req: RequestSession, res: Response, next: NextFunction) => {
    if (!req.session.username) {
        next(); // User is a guest, proceed to the next middleware or route handler
    } else {
        res.redirect('/'); // User is logged in, redirect to the home page
    }
}

// Middleware to check if the user is an admin
const isAdmin = (req: RequestSession, res: Response, next: NextFunction) => {
    if (req.session.username && req.session.isAdmin) {
        next(); // User is an admin, proceed to the next middleware or route handler
    } else {
        res.status(403).send('Forbidden'); // User is not an admin, send a 403 Forbidden status
    }
}

export { isLoggedIn, isGuest, isAdmin };