import dotenv from 'dotenv';
dotenv.config({

})


interface ServerConfig {
    DatabaseUrl: string;
}

class Config implements ServerConfig {
    DatabaseUrl: string = process.env.DatabaseUrl ?? '';
}