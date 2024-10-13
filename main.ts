import express, { Express } from "express";
import { MainServer } from './src/serverSetup';
class MainApplication {
    public init(): void {
        const app: Express = express();
        const server = new MainServer(app);
        server.start();
    }
}

const application = new MainApplication();
application.init();