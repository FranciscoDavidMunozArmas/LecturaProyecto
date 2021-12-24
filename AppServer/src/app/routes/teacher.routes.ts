import { Router } from 'express';
import { authUser } from '../auth/auth.auth';
import * as Controller from '../controllers/teacher.controller';

const router = Router();

router.route("/")
.get(authUser, Controller.getTeachers)
.post(Controller.createTeacher)
.delete(authUser, Controller.deleteTeachers);

router.route("/teacher/:id")
.get(authUser, Controller.getTeacher)
.put(authUser, Controller.updateTeacher)
.delete(authUser, Controller.deleteTeacher);

export default router;