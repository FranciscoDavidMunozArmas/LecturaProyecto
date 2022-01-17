import { Router } from 'express';
import multerAudioConfig from '../../config/multerAudio.config';
import { authAdmin, authTeacher, authUser } from '../auth/auth.auth';
import * as CourseController from '../controllers/course.controller';
import * as ScoreController from '../controllers/score.controller';

const router = Router();

router.route("/")
    // .post(authUser, authTeacher, CourseController.createCourse)
    .get(authUser, CourseController.getCourses)
    .post(authUser, authAdmin, CourseController.createCourse)
    .delete(authUser, authAdmin, CourseController.deleteCourses);

router.route("/many")
    .get(authUser, CourseController.getCoursesMany);

router.route("/course/:id")
    // .put(authUser, authTeacher, CourseController.updateCourse)
    // .delete(authUser, authTeacher, CourseController.deleteCourse)
    .get(authUser, CourseController.getCourse)
    .put(authUser, authAdmin, CourseController.updateCourse)
    .delete(authUser, authAdmin, CourseController.deleteCourse);

router.route("/course/:id/complete")
    // .post(authUser, authStudent, CourseController.completeCourse);
    .post(authUser, authAdmin, CourseController.completeCourse);

router.route("/course/:courseId/score")
    .post(authUser, ScoreController.setScore)
    .delete(authUser, ScoreController.deleteScore);

router.route("/course/:courseId/content/topics/")
    // .post(authUser, authTeacher, multerAudioConfig.single('audio'), CourseController.createTopic);
    .post(authUser, authAdmin, CourseController.createTopic);

router.route("/course/:courseId/content/topics/topic/:topicId")
    // .put(authUser, authTeacher, CourseController.updateTopic);
    // .delete(authUser, authTeacher, deleteTopic);
    .put(authUser, authAdmin, CourseController.updateTopic)
    .delete(authUser, authAdmin, CourseController.deleteTopic);

router.route("/course/:courseId/content/topics/topic/:topicId/class")
    // .post(authUser, authTeacher, CourseController.addCourseContent)
    // .put(authUser, authTeacher, CourseController.updateCourseContent)
    .post(authUser, authAdmin, multerAudioConfig.single("audio"), CourseController.addCourseClass)
    .delete(authUser, authAdmin, CourseController.deleteCourseClasses);

router.route("/course/:courseId/content/topics/topic/:topicId/class/:classId")
    // .put(authUser, authTeacher, CourseController.addCourseContent)
    // .delete(authUser, authTeacher, CourseController.deleteCourseClass)
    .put(authUser, authAdmin, multerAudioConfig.single("audio"), CourseController.updateCourseClass)
    .delete(authUser, authAdmin, CourseController.deleteCourseClass);

export default router;