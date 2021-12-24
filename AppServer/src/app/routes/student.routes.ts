import { Router } from 'express';
import { authUser } from '../auth/auth.auth';
import * as Controller from '../controllers/student.controller';

const router = Router();

router.route("/")
.get(authUser, Controller.getStudents)
.post(Controller.createStudent)
.delete(authUser, Controller.deleteStudents);

router.route("/student/:id")
.get(authUser, Controller.getStudent)
.put(authUser, Controller.updateStudent)
.delete(authUser, Controller.deleteStudent);

export default router;