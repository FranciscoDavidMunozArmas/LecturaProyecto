import { Router } from 'express';
import multerAudioConfig from '../../config/multerAudio.config';
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

router.route("/course/:courseId/content/topics/")
    // .post(authUser, authTeacher, multerAudioConfig.single('audio'), Controller.createTopic);
    .post(authUser, authAdmin, Controller.createTopic);

router.route("/course/:courseId/content/topics/topic/:topicId")
    // .post(authUser, authTeacher, multerAudioConfig.single('audio'), Controller.createTopic);
    .put(authUser, authAdmin, Controller.updateTopic);

router.route("/course/:courseId/content/topics/topic/:topicId/class")
    // .post(authUser, authTeacher, Controller.addCourseContent)
    .post(authUser, authAdmin, multerAudioConfig.single("audio"), Controller.addCourseClasses)
    // .put(authUser, authTeacher, Controller.updateCourseContent)
    // .put(authUser, authAdmin, Controller.updateCourseContent);

export default router;