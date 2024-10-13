import { Application, json, urlencoded } from "express";
import http from 'http';
import cors from 'cors';
import helmet from "helmet";
import cookieSession from 'cookie-session';
import HTTP_STATUS from "http-status-codes";
import 'express-async-errors';
import comporession from 'compression';
export class MainServer {
    constructor(private app: Application) { }
    public start() {
        this.setupMiddleWares(this.app);
        this.setupSecurityMiddleWares(this.app);
        this.setUpRoutes();
        this.setupServer(this.app);
    }

    private setupSecurityMiddleWares(app: Application) {
        new CookieMiddleWare(this.app, {
            name: "session",
            keys: [],
            maxAge: 24 * 3600000,
            secure: false
        } as CookieSetupConfig);
        app.use(helmet());
        new CorsMiddleWare(this.app, {
            origin: '*',
            credentials: true,
            optionsSuccessStatus: 200,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
        } as CorsConfig);
    }
    private setupMiddleWares(app: Application) {
        app.use(comporession());
        app.use(json());
        app.use(urlencoded({ extended: true, limit: '50mb' }))
    }

    private setUpRoutes() {

    }

    setupServer(app: Application) {
        try {
            const server: http.Server = new http.Server(app);
            this.startServer(server, 8080);
        }
        catch (exception: unknown) {
            console.log(exception);
        }
    }

    startServer(httpServer: http.Server, port: number) {
        httpServer.listen(port, () => {
            console.log('Server is running on port', port);
        })
    }

}

export interface CookieSetupConfig {
    name: string,
    keys: [],
    maxAge: number,
    secure: boolean
}

class CookieMiddleWare {
    constructor(private app: Application, config: CookieSetupConfig) {
        this.app.use(
            cookieSession({
                ...config
            })
        );
    }
}


export type HttpVerbs = "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS"

export interface CorsConfig {
    origin: string,
    credentials: boolean,
    optionsSuccessStatus: number,
    methods: HttpVerbs[]
}

class CorsMiddleWare {
    constructor(private app: Application, configs: CorsConfig) {
        this.app.use(cors({
            ...configs
        }))
    }
}