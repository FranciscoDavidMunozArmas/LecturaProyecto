import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { CONSTANTS } from './lib/utils';

import userRouter from './app/routes/user.routes';
import studentRouter from './app/routes/student.routes';
import teacherRouter from './app/routes/teacher.routes';
import courseRouter from './app/routes/course.routes';
import certificateRouter from './app/routes/certificate.routes';

const app = express();
const apiRoot = `/api/${CONSTANTS.API_VERSION}`;

//settings
app.set("port", CONSTANTS.PORT);

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended:true }));
app.use(express.json());

//routes
app.use(`${apiRoot}/users`, userRouter);
app.use(`${apiRoot}/students`, studentRouter);
app.use(`${apiRoot}/teachers`, teacherRouter);
app.use(`${apiRoot}/courses`, courseRouter);
app.use(`${apiRoot}/certificates`, certificateRouter);

export default app;