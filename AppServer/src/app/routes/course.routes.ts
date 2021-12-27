import { Router } from 'express';
import multerAudioConfig from '../../config/multerAudio.config';
import { authAdmin, authTeacher, authUser } from '../auth/auth.auth';
import * as Controller from '../controllers/course.controller';

const router = Router();

router.route("/")
// .post(authUser, authTeacher, Controller.createCourse)
    .get(authUser, Controller.getCourses)
    .post(authUser, authAdmin, Controller.createCourse)
    .delete(authUser, authAdmin, Controller.deleteCourses);

router.route("/course/:id")
// .put(authUser, authTeacher, Controller.updateCourse)
    .get(authUser, Controller.getCourse)
    .put(authUser, authAdmin, Controller.updateCourse)
    .delete(authUser, authAdmin, Controller.deleteCourse);

router.route("/course/:courseId/content/topics/")
    // .post(authUser, authTeacher, multerAudioConfig.single('audio'), Controller.createTopic);
    .post(authUser, authAdmin, Controller.createTopic);

router.route("/course/:courseId/content/topics/topic/:topicId")
    // .put(authUser, authTeacher, Controller.updateTopic);
    // .delete(authUser, authTeacher, deleteTopic);
    .put(authUser, authAdmin, Controller.updateTopic)
    .delete(authUser, authAdmin, Controller.deleteTopic);

router.route("/course/:courseId/content/topics/topic/:topicId/class")
    // .post(authUser, authTeacher, Controller.addCourseContent)
    // .put(authUser, authTeacher, Controller.updateCourseContent)
    .post(authUser, authAdmin, multerAudioConfig.single("audio"), Controller.addCourseClass)
    .delete(authUser, authAdmin, Controller.deleteCourseClasses);

router.route("/course/:courseId/content/topics/topic/:topicId/class/:classId")
    // .put(authUser, authTeacher, Controller.addCourseContent)
    // .delete(authUser, authTeacher, Controller.deleteCourseClass)
    .put(authUser, authAdmin, multerAudioConfig.single("audio"), Controller.updateCourseClass)
    .delete(authUser, authAdmin, Controller.deleteCourseClass);

export default router;