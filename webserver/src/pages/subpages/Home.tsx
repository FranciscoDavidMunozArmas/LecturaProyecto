import React, { useEffect, useState } from 'react'
import { useSpeechSynthesis } from "react-speech-kit";
import CourseCard from '../../components/CourseCard';
import Subtitle from '../../components/Subtitle'
import Title from '../../components/Title'
import { HOME_NAME, SUBSECTION_HOME_1_NAME, SUBSECTION_HOME_2_NAME, SUBSECTION_HOME_3_NAME, VOICE_ES } from '../../libs/utils'
import { Course, courseConverter } from '../../models/Course'

import * as CourseService from '../../services/course.service';

const styles = {
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column' as const,
        overflowY: 'auto' as const,
    }
}

function Home() {

    const [newCourses, setnewCourses] = useState<Course[]>([]);
    const [topCourses, settopCourses] = useState<Course[]>([]);
    const [recommendedCourses, setrecommendedCourses] = useState<Course[]>([]);
    const { speak, cancel } = useSpeechSynthesis();

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
            console.log({ errorCode: error.code, errorMessage: error.message });
        }
    }

    const getTopCourses = async () => {
        try {
            const response = await CourseService.getCourses();
            const data = response.data.map(courseConverter.fromJSON);
            settopCourses(data);
        } catch (error: any) {
            console.log({ errorCode: error.code, errorMessage: error.message });
        }
    }

    const getRecommendedCourses = async () => {
        try {
            const response = await CourseService.getCourses();
            const data = response.data.map(courseConverter.fromJSON);
            setrecommendedCourses(data);
        } catch (error: any) {
            console.log({ errorCode: error.code, errorMessage: error.message });
        }
    }

    const onSpeak = (text: string) => {
        speak({ text: text, voice: VOICE_ES });
    }

    const courseCard = (data: Course[]) => {
        return data.map((course: Course, index: any) => {
            return (
                <div key={index}>
                    <CourseCard course={course} />
                </div>
            )
        });
    }

    return (
        <>
            <div style={styles.container}>
                <Title title={HOME_NAME} />
                <Subtitle text={SUBSECTION_HOME_1_NAME} />
                {
                    courseCard(newCourses)
                }
                <Subtitle text={SUBSECTION_HOME_2_NAME} />
                {
                    courseCard(topCourses)
                }
                <Subtitle text={SUBSECTION_HOME_3_NAME} />
                {
                    courseCard(recommendedCourses)
                }
            </div>
        </>
    )
}

export default Home
