import express from 'express';
import { connectMongoDB } from '../util/mongodb.js';
import { config } from '../config/init.js';

const financeRouter = express.Router();
financeRouter.use(express.json());

export default financeRouter;