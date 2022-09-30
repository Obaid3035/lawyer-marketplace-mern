import express, {Application} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import {IController} from './interface';
import handleError from './middleware/errorHandler';
import mongoose from "mongoose";
import http from "http";
import EventHandler from "./utils/wss";
import { Server} from "socket.io";


class App {
    public app: Application;

    constructor(controllers: IController[]) {
        this.app = express();
        this.initializeMiddleware();
        this.initializeController(controllers);
        this.initializeErrorHandler();

    }

    public async bootstrap() {
        console.log(process.env.DATABASE_URL)
        mongoose.connect(process.env.DATABASE_URL).then(() => {
            const server = this.app.listen(process.env.PORT, () => {
                console.log("Server is up and running");
            });
            App.initializeSocket(server);
        });
    }


    private static initializeSocket(server: http.Server) {
        new EventHandler(
            new Server(server, {
                cors: {
                    origin: process.env.CLIENT
                },
                pingTimeout: 20000,
                pingInterval: 25000
            })
        );
    }



    private initializeMiddleware() {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(
            rateLimit({
                windowMs: 15 * 60 * 1000,
                max: 500,
            }),
        );
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
    }

    private initializeController(controllers: IController[]) {
        controllers.forEach((controller) => {
            this.app.use(controller.router);
        });
    }

    private initializeErrorHandler() {
        this.app.use(handleError);
    }
}

export default App;
