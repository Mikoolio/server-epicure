import { config } from './config/config';
import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import Logging from './library/Logging';
import chefRoutes from './routes/Chef';
import restaurantRoutes from './routes/Restaurant';
import dishRoutes from './routes/Dish';
import connectToDatabase from './connections/dbConnection';

const router = express();

connectToDatabase()
    .then(() => {
        StartServer();
    })
    .catch((error) => {
        Logging.error('Unable to start server');
        Logging.error(error);
    });

const StartServer = () => {
    router.use((req, res, next) => {
        Logging.info(`Incoming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });

        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });
    router.use('/api/restaurants', restaurantRoutes);
    router.use('/api/chefs', chefRoutes);
    router.use('/api/dishes', dishRoutes);

    router.use((req, res, next) => {
        const error = new Error('Not found');
        Logging.error(error);

        next(error);
    });

    router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        Logging.error(err);
        const statusCode = (err as any).status || 500;
        res.status(statusCode).json({
            message: err.message || 'Internal Server Error'
        });
    });

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));
};
