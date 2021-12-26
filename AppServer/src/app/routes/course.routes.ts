import { Router } from 'express';
import { authAdmin, authTeacher, authUser } from '../auth/auth.auth';
import * as Controller from '../controllers/course.controller';

const router = Router();

router.route("/")
    .get(authUser, Controller.getCourses)
    // .post(authUser, authTeacher, Controller.createCourse)
    .post(authUser, authAdmin, Controller.createCourse)
    .delete(authUser, authAdmin, Controller.deleteCourses);

router.route("/course/:id")
    .get(authUser, Controller.getCourse)
    // .put(authUser, authTeacher, Controller.updateCourse)
    .put(authUser, authAdmin, Controller.updateCourse)
    .delete(authUser, authAdmin, Controller.deleteCourse);

export default router;