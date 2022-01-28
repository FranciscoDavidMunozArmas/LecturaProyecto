import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSpeechSynthesis } from "react-speech-kit";
import CourseCard from '../../components/CourseCard';
import Subtitle from '../../components/Subtitle'
import Title from '../../components/Title'
import { StudentContext } from '../../context/StudentContext';
import { toastManager } from '../../libs/toastManager';
import { decodeToken, getToken } from '../../libs/tokenInterceptor'
import { GETTING_DATA_ERROR, MY_COURSES_NAME, PATH_COURSE, SUBSECTION_MY_COURSES_1_NAME, SUBSECTION_MY_COURSES_2_NAME, VOICE_ES } from '../../libs/utils'
import { Course, courseConverter } from '../../models/Course';
import { CourseClass } from '../../models/CourseClass';
import { Student, studentConverter } from '../../models/Student'
import { getCoursesMany } from '../../services/course.service';
import { getStudent } from '../../services/student.service'

const styles = {
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column' as const,
        overflowY: 'auto' as const,
    },
    moreContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'end',
    },
    moreButton: {
        fontSize: '1rem',
        fontStyle: 'italic',
        margin: '10px 15px',
    },
}

function MyCourses() {

    const [user, setuser] = useState<Student>();
    const [completedCourses, setcompletedCourses] = useState<Course[]>([]);
    const [nonCompletedCourses, setnonCompletedCourses] = useState<Course[]>([]);

    const student = useContext(StudentContext);

    const navigate = useNavigate();
    const { speak, cancel } = useSpeechSynthesis();

    useEffect(() => {
        getUser();
        return () => { }
    }, []);

    const getUser = async () => {
        try {
            getCourses(student);
        } catch (error: any) {
            toastManager.error(GETTING_DATA_ERROR);
            onSpeak(GETTING_DATA_ERROR);
        }
    }

    const getCourses = async (student: any) => {
        if (!student) {
            toastManager.error(GETTING_DATA_ERROR);
            onSpeak(GETTING_DATA_ERROR);
            return;
        }
        try {
            const data = student.courses.map((course: any) => {
                return course.courseID;
            });
            const coursesData = await getCoursesMany(data);
            classifyCourses(student, coursesData.data.map(courseConverter.fromJSON));
        } catch (error: any) {
            toastManager.error(GETTING_DATA_ERROR);
            onSpeak(GETTING_DATA_ERROR);
        }
    }

    const classifyCourses = (student: Student, courses: Course[]) => {
        const completedCourses: Course[] = [];
        const nonCompletedCourses: Course[] = [];
        courses.forEach((course: Course) => {
            let courseLength: number = 0;
            course.content.topics.forEach(topic => {
                courseLength += topic.classes.length;
            });
            const data = student.courses.find((courseData) => courseData.courseID === course.id);
            if (courseLength === data?.completed.length) {
                completedCourses.push(course);
            } else {
                nonCompletedCourses.push(course);
            }
        });
        setcompletedCourses(completedCourses);
        setnonCompletedCourses(nonCompletedCourses);
    }

    const onClick = (course: Course) => {
        navigate(`../${PATH_COURSE}`, { state: { course: course, saved: true, student: user } });
    }

    const courseCard = (data: Course[]) => {
        return data.map((course: Course, index: any) => {
            return (
                <div key={index}>
                    <CourseCard course={course} onClick={() => onClick(course)} completed={completedPercentage(course)} />
                </div>
            )
        });
    }

    const completedPercentage = (course: Course) => {
        let classLength = 0;
        let completedLength = 1;
        course.content.topics.forEach(topic => {
            classLength += topic.classes.length;
        });
        if (classLength === 0) {
            classLength = 1;
        }
        const courseData = student?.courses.find((courseData) => courseData.courseID === course.id);
        if (courseData) {
            completedLength = (courseData.completed.length === 0) ? 1 : courseData.completed.length;
        }
        const percentage = completedLength / classLength;
        return percentage * 100;
    }

    const onSpeak = (text: string) => {
        speak({ text: text, voice: VOICE_ES });
    }

    return (
        <div style={styles.container}>
            <Title title={MY_COURSES_NAME} />
            <div>
                <Subtitle text={SUBSECTION_MY_COURSES_1_NAME} />
                {
                    courseCard(completedCourses)
                }
                <Subtitle text={SUBSECTION_MY_COURSES_2_NAME} />
                {
                    courseCard(nonCompletedCourses)
                }
            </div>
        </div>
    )
}

export default MyCourses
