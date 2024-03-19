import express, { Express } from 'express';
import { engine } from 'express-handlebars';
import { sessionConfig } from './config/sessionConfig';
import indexRouter from './routes/indexRoutes';
import userRouter from './routes/userRoutes';
import photoRouter from './routes/photoRoutes';
import commentRouter from './routes/commentRoutes';
import { initializeDatabase } from './database/connection';
import sessionMiddleware from './middlewares/auth/session';
import helpers from './utils/helpers';

export default class Application {
    app: Express;

    constructor() {
        this.app = express();
        this.initialize();
    }

    private initialize() {
        this.app.engine('handlebars', engine({
            runtimeOptions: {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true
            },
            helpers: helpers,
            layoutsDir: 'src/views/layouts',
            partialsDir: 'src/views/partials'
        }));
        this.app.set('view engine', 'handlebars');
        this.app.set('views', ['./src/views', './src/views/users', './src/views/photos', './src/views/comments', './src/views/partials']);
        
        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(sessionConfig);
        this.app.use(sessionMiddleware);

        initializeDatabase();
        
        this.app.get('/', indexRouter);
        this.app.use('/users', userRouter);
        this.app.use('/photos', photoRouter);
        this.app.use('/comments', commentRouter);
    }

    public listen(port: number) {
        this.app.listen(port, () => console.log(`Server is running on port ${port}`));
    }
}
