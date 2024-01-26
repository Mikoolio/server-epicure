import { config } from './config/config';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import Logging from './library/Logging';
import chefRoutes from './routes/Chef';
import restaurantRoutes from './routes/Restaurant';
import dishRoutes from './routes/Dish';

const router = express();

mongoose
    .connect(config.mongo.url)
    .then(() => {
        Logging.info('connected to mongodb');
        StartServer();
    })
    .catch((error) => {
        Logging.error('unable to connect');
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
    router.use('/restaurant', restaurantRoutes);
    router.use('/chef', chefRoutes);
    router.use('/dish', dishRoutes);

    router.use((req, res, next) => {
        const error = new Error('Not found');

        Logging.error(error);

        res.status(404).json({
            message: error.message
        });
    });

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));
};
