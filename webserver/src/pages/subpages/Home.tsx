import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSpeechSynthesis } from "react-speech-kit";
import CourseCard from '../../components/CourseCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import MoreButton from '../../components/MoreButton';
import Subtitle from '../../components/Subtitle'
import Title from '../../components/Title'
import { StudentContext } from '../../context/StudentContext';
import { toastManager } from '../../libs/toastManager';
import { decodeToken, getToken } from '../../libs/tokenInterceptor';
import { GETTING_DATA_ERROR, HOME_NAME, MORE_NAME, PATH_CERTIFICATES, PATH_COURSE, PATH_EARLEANING, SUBSECTION_HOME_1_NAME, SUBSECTION_HOME_2_NAME, SUBSECTION_HOME_3_NAME, VOICE_ES } from '../../libs/utils'
import { Course, courseConverter } from '../../models/Course'
import { Student } from '../../models/Student';

import * as CourseService from '../../services/course.service';
import { getStudent } from '../../services/student.service';

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

function Home() {

    const [newCourses, setnewCourses] = useState<Course[]>([]);
    const [topCourses, settopCourses] = useState<Course[]>([]);
    const [recommendedCourses, setrecommendedCourses] = useState<Course[]>([]);
    const [newCoursesLength, setnewCoursesLength] = useState<number>(5);
    const [topCoursesLength, settopCoursesLength] = useState<number>(5);
    const [recommendedCoursesLength, setrecommendedCoursesLength] = useState<number>(5);

    const [loadingNewCourses, setloadingNewCourses] = useState<boolean>(false);
    const [loadingTopCourses, setloadingTopCourses] = useState<boolean>(false);
    const [loadingRecommendedCourses, setloadingRecommendedCourses] = useState<boolean>(false);

    const { speak, cancel } = useSpeechSynthesis();
    const student = useContext(StudentContext);

    const navigate = useNavigate();

    useEffect(() => {
        getNewCourses();
        getTopCourses();
        getRecommendedCourses();
        return () => { }
    }, [])

    const getNewCourses = async () => {
        setloadingNewCourses(true);
        try {
            const response = await CourseService.getCourses();
            const data = response.data.map(courseConverter.fromJSON);
            setnewCourses(data);
        } catch (error: any) {
            toastManager.error(GETTING_DATA_ERROR);
            onSpeak(GETTING_DATA_ERROR);
        }
        setloadingNewCourses(false);
    }

    const getTopCourses = async () => {
        setloadingTopCourses(true);
        try {
            const response = await CourseService.getCourses();
            const data = response.data.map(courseConverter.fromJSON);
            settopCourses(data);
        } catch (error: any) {
            toastManager.error(GETTING_DATA_ERROR);
            onSpeak(GETTING_DATA_ERROR);
        }
        setloadingTopCourses(false);
    }

    const getRecommendedCourses = async () => {
        setloadingRecommendedCourses(true);
        try {
            const response = await CourseService.getCourses();
            const data = response.data.map(courseConverter.fromJSON);
            setrecommendedCourses(data);
        } catch (error: any) {
            toastManager.error(GETTING_DATA_ERROR);
            onSpeak(GETTING_DATA_ERROR);
        }
        setloadingRecommendedCourses(false);
    }

    const onSpeak = (text: string) => {
        speak({ text: text, voice: VOICE_ES });
    }

    const onClick = (course: Course) => {
        const saved = !!student?.courses.find(c => c.courseID === course.id);
        navigate(`../${PATH_COURSE}`, { state: { course: course, saved: saved, student: student } });
    }

    const courseCard = (data: Course[]) => {
        return data.map((course: Course, index: any) => {
            return (
                <div key={index}>
                    <CourseCard course={course} onClick={() => onClick(course)} />
                </div>
            )
        });
    }

    return (
        <>
            <div style={styles.container}>
                <Title title={HOME_NAME} />
                <div>
                    <Subtitle text={SUBSECTION_HOME_1_NAME} />
                    {
                        loadingNewCourses ?
                            <LoadingSpinner />
                            :
                            <>
                                {
                                    courseCard(newCourses.slice(0, newCoursesLength))
                                }
                                {
                                    newCourses.length > topCoursesLength &&
                                    <MoreButton onClick={() => { setnewCoursesLength(newCoursesLength + 5) }} />
                                }
                            </>
                    }
                </div>
                <div>
                    <Subtitle text={SUBSECTION_HOME_2_NAME} />
                    {
                        loadingTopCourses ?
                            <LoadingSpinner />
                            :
                            <>
                                {
                                    courseCard(topCourses.slice(0, topCoursesLength))
                                }
                                {
                                    topCourses.length > topCoursesLength &&
                                    <MoreButton onClick={() => { settopCoursesLength(topCoursesLength + 5) }} />
                                }
                            </>
                    }
                </div>
                <div>
                    <Subtitle text={SUBSECTION_HOME_3_NAME} />
                    {
                        loadingRecommendedCourses ?
                            <LoadingSpinner /> :
                            <>
                                {
                                    courseCard(recommendedCourses.slice(0, recommendedCoursesLength))
                                }
                                {
                                    recommendedCourses.length > recommendedCoursesLength &&
                                    <MoreButton onClick={() => { setrecommendedCoursesLength(recommendedCoursesLength + 5) }} />
                                }
                            </>
                    }
                </div>
            </div>
        </>
    )
}

export default Home
