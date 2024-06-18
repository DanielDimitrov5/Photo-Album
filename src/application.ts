import express, { Express } from 'express';
import http from 'http';
import { Server as ServerIOSocket } from 'socket.io';
import { engine } from 'express-handlebars';
import { sessionConfig } from './config/sessionConfig';
import indexRouter from './routes/indexRoutes';
import userRouter from './routes/userRoutes';
import PhotoRouterConfig from './routes/photoRoutes';
import commentRouter from './routes/commentRoutes';
import { initializeDatabase } from './database/connection';
import sessionMiddleware from './middlewares/auth/session';
import helpers from './utils/helpers';
import { configDotenv } from 'dotenv';
configDotenv();

export default class Application {
    app: Express;
    httpServer: http.Server;
    io: ServerIOSocket;

    constructor() {
        this.app = express();
        this.httpServer = http.createServer(this.app);
        this.io = new ServerIOSocket(this.httpServer, {
            cors: {
                origin: `http://localhost:${process.env.PORT || 3000}`,
                methods: ['GET', 'POST']
            }
        
        });
        this.initialize();
        this.initializeWebSocket();
    }

    private async initialize() {
        this.app.engine('hbs', engine({
            runtimeOptions: {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true
            },
            helpers: helpers,
            layoutsDir: 'src/views/layouts',
            partialsDir: 'src/views/partials',
            extname: '.hbs'
        }));
        this.app.set('view engine', 'hbs');
        this.app.set('views', ['./src/views', './src/views/users', './src/views/photos', './src/views/comments', './src/views/partials']);
        
        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(sessionConfig);
        this.app.use(sessionMiddleware);

        await initializeDatabase();
        
        this.app.get('/', indexRouter);
        this.app.use('/users', userRouter);
        this.app.use('/comments', commentRouter);
        const photoRouter = new PhotoRouterConfig(this.io).getRouter();
        this.app.use('/photos', photoRouter);
    }

    private initializeWebSocket() {
        this.io.on('connection', (socket) => {
            console.log('A user connected via WebSocket');

            socket.on('disconnect', () => {
                console.log('User disconnected');
            });
        });
    }

    public listen(port: number) {
        this.httpServer.listen(port, () => console.log(`Server is running on port ${port}`));
    }
}
