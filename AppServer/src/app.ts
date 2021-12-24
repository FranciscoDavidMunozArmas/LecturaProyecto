import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { CONSTANTS } from './lib/utils';

import indexRouter from './app/routes/index.routes';

const app = express();

//settings
app.set("port", CONSTANTS.PORT);

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended:false }));
app.use(express.json());

//routes
app.use("/", indexRouter);

export default app;