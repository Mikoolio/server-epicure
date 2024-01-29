import mongoose from 'mongoose';
import { config } from '../config/config';
import Logging from '../library/Logging';

const connectToDatabase = async () => {
    try {
        await mongoose.connect(config.mongo.url);
        Logging.info('Connected to MongoDB');
    } catch (error) {
        Logging.error('Unable to connect to MongoDB');
        Logging.error(error);
        throw error;
    }
};

export default connectToDatabase;
