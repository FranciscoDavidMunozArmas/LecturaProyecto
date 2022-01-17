import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSpeechSynthesis } from "react-speech-kit";
import CourseCard from '../../components/CourseCard';
import Subtitle from '../../components/Subtitle'
import Title from '../../components/Title'
import { toastManager } from '../../libs/toastManager';
import { GETTING_DATA_ERROR, HOME_NAME, MORE_NAME, PATH_CERTIFICATES, PATH_COURSE, PATH_EARLEANING, SUBSECTION_HOME_1_NAME, SUBSECTION_HOME_2_NAME, SUBSECTION_HOME_3_NAME, VOICE_ES } from '../../libs/utils'
import { Course, courseConverter } from '../../models/Course'

import * as CourseService from '../../services/course.service';

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
    const { speak, cancel } = useSpeechSynthesis();

    const navigate = useNavigate();

    useEffect(() => {
        getNewCourses();
        getTopCourses();
        getRecommendedCourses();
        return () => { }
    }, [])

    const getNewCourses = async () => {
        try {
            const response = await CourseService.getCourses();
            const data = response.data.map(courseConverter.fromJSON);
            setnewCourses(data);
        } catch (error: any) {
            toastManager.error(GETTING_DATA_ERROR);
            onSpeak(GETTING_DATA_ERROR);
        }
    }

    const getTopCourses = async () => {
        try {
            const response = await CourseService.getCourses();
            const data = response.data.map(courseConverter.fromJSON);
            settopCourses(data);
        } catch (error: any) {
            toastManager.error(GETTING_DATA_ERROR);
            onSpeak(GETTING_DATA_ERROR);
        }
    }

    const getRecommendedCourses = async () => {
        try {
            const response = await CourseService.getCourses();
            const data = response.data.map(courseConverter.fromJSON);
            setrecommendedCourses(data);
        } catch (error: any) {
            toastManager.error(GETTING_DATA_ERROR);
            onSpeak(GETTING_DATA_ERROR);
        }
    }

    const onSpeak = (text: string) => {
        speak({ text: text, voice: VOICE_ES });
    }

    const onClick = (course: Course) => {
        navigate(`../${PATH_COURSE}`, { state: { course: course } });
    }

    const courseCard = (data: Course[]) => {
        return data.map((course: Course, index: any) => {
            return (
                <div key={index}>
                    <CourseCard course={course} onClick={() => onClick(course)}/>
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
                        courseCard(newCourses.slice(0, newCoursesLength))
                    }
                    <div style={styles.moreContainer}
                        onMouseEnter={() => { onSpeak(MORE_NAME) }}
                        onMouseLeave={() => { cancel() }}>
                        {
                            newCourses.length > newCoursesLength &&
                            <a style={styles.moreButton}
                                onClick={() => { setnewCoursesLength(newCoursesLength + 5) }}
                            >{MORE_NAME}</a>
                        }
                    </div>
                </div>
                <div>
                    <Subtitle text={SUBSECTION_HOME_2_NAME} />
                    {
                        courseCard(topCourses.slice(0, topCoursesLength))
                    }
                    <div style={styles.moreContainer}
                        onMouseEnter={() => { onSpeak(MORE_NAME) }}
                        onMouseLeave={() => { cancel() }}>
                        {
                            topCourses.length > topCoursesLength &&
                            <a style={styles.moreButton}
                                onClick={() => { settopCoursesLength(topCoursesLength + 5) }}
                            >{MORE_NAME}</a>
                        }
                    </div>
                </div>
                <div>
                    <Subtitle text={SUBSECTION_HOME_3_NAME} />
                    {
                        courseCard(recommendedCourses.slice(0, recommendedCoursesLength))
                    }
                    <div style={styles.moreContainer}
                        onMouseEnter={() => { onSpeak(MORE_NAME) }}
                        onMouseLeave={() => { cancel() }}>
                        {
                            recommendedCourses.length > recommendedCoursesLength &&
                            <a style={styles.moreButton}
                                onClick={() => { setrecommendedCoursesLength(recommendedCoursesLength + 5) }}
                            >{MORE_NAME}</a>
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

export default Home
