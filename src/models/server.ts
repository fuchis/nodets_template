import express, { Express } from 'express';
import dotenv from 'dotenv';
import serverless from 'serverless-http';
import { logger } from '../middlewares/logger';
import { PeliculasRouter } from '../routes/peliculas.routes';
import { UsuariosRouter } from '../routes/usuarios.routes';

dotenv.config();

export default class Server {

    public app: Express;
    private port: number;
    private isDev: boolean;
    private srv: any;

    constructor() {
        this.app = express();
        this.port = Number(process.env.PORT) || 3000;
        this.isDev = process.env.NODE_ENV === 'development';
        this.middlewares()
        this.routes();
        this.srv = serverless(this.app);
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(logger);
    }

    appServer() {
        return this.app;
    }

    routes() {
        this.app.use(PeliculasRouter.getRouter());
        this.app.use(UsuariosRouter.getRouter());
    }

    serverless() {
        return this.srv;
    }

    listen() {
        if (this.isDev) {
            this.app.listen(this.port, () => {
                console.log(`⚡：[server]: Server is running at http://localhost:${this.port}`)
            });
        }
    }
}
