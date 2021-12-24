import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { CONSTANTS } from './lib/utils';

import userRouter from './app/routes/user.routes';
import studentRouter from './app/routes/student.routes';

const app = express();

//settings
app.set("port", CONSTANTS.PORT);

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended:false }));
app.use(express.json());

//routes
app.use("/users", userRouter);
app.use("/students", studentRouter);

export default app;