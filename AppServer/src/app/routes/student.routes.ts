import { Router } from 'express';
import { authStudent, authUser } from '../auth/auth.auth';
import * as Controller from '../controllers/student.controller';

const router = Router();

router.route("/")
    .get(authUser, Controller.getStudents)
    .post(Controller.createStudent)
    .delete(authUser, Controller.deleteStudents);

router.route("/student/:id")
    .get(authUser, authStudent, Controller.getStudent)
    .put(authUser, authStudent, Controller.updateStudent)
    .delete(authUser, authStudent, Controller.deleteStudent);

export default router;