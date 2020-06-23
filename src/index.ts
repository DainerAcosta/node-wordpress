import express, { Application } from 'express';
import { Pool } from 'mysql2';
import morgan from 'morgan';
import cors from 'cors';
import pool from './database/db'
require("dotenv").config();

import indexRoutes from './routes/indexRoutes';
import eventRoutes from './routes/eventRoutes';
import userRoutes from './routes/userRoutes';

class Server {

    public app: Application;
    public pool: Pool;
    
    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.pool = pool;
    }

    config(): void {
        this.app.set('port', process.env.PORT || 4000);

        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(): void {
        this.app.use('/', indexRoutes);
        this.app.use('/eventos', eventRoutes);
        this.app.use('/usuarios', userRoutes);
    }

    start() {
        this.pool;
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }

}

const server = new Server();
server.start();
