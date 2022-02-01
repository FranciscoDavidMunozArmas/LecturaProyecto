import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useSpeechSynthesis } from 'react-speech-kit';
import Menubar from '../components/Menubar';
import { TeacherProvider } from '../context/TeacherContext';
import { routes } from '../libs/routes';
import { palette } from '../libs/styles';
import { toastManager } from '../libs/toastManager';
import { checkToken, decodeToken, getToken } from '../libs/tokenInterceptor';
import { GETTING_DATA_ERROR, PATH_COURSE, PATH_HOME, PATH_PLAYCOURSE, VOICE_ES } from '../libs/utils';
import { Teacher, teacherConverter } from '../models/Teacher';
import { getTeacher } from '../services/teacher.service';
import CoursePage from './subpages/teacher/CoursePage';
import Home from './subpages/teacher/Home';
import PlayCourse from './subpages/teacher/PlayCourse';

const styles = {
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row' as const,
        height: '100vh',
        backgroundColor: palette.white
    },
    menuContainer: {
        width: '20%',
        minWidth: '250px',
        boxShadow: "2px 0 5px rgba(0,0,0,0.25)",
        padding: '1rem',
    },
    contentContainer: {
        width: '80%',
        minWidth: '750px',
        padding: '1rem',
    },
}

function TeacherPage() {

    const [currentTeacher, setCurrentTeacher] = useState<Teacher>();

    const naviate = useNavigate();
    const { speak, cancel } = useSpeechSynthesis();


    const getData = async () => {
        const token: any = decodeToken(getToken());
        try {
            const data = await getTeacher(token.token);
            setCurrentTeacher(teacherConverter.fromJSON(data.data));
        } catch (error: any) {
            toastManager.error(GETTING_DATA_ERROR);
            onSpeak(GETTING_DATA_ERROR);
        }
    }

    const onSpeak = (text: string) => {
        speak({ text, voice: VOICE_ES, rate: 1.2 });
    }

    useEffect(() => {
        if (!checkToken()) {
            naviate('/login');
        }
        getData();
        return () => { };
    }, []);


    return (
        <>
            <TeacherProvider teacher={currentTeacher}>
                <div style={styles.container}>
                    <div style={styles.menuContainer}>
                        <Menubar children={routes.teacher} />
                    </div>
                    <div style={styles.contentContainer}>
                        <Routes>
                            <Route path={PATH_HOME} element={<Home />} />
                            <Route path={PATH_COURSE} element={<CoursePage />} />
                            <Route path={`${PATH_COURSE}/${PATH_PLAYCOURSE}`} element={<PlayCourse />} />
                            <Route path="/*" element={<Navigate to={PATH_HOME} />} />
                        </Routes>
                    </div>
                </div>
            </TeacherProvider>
        </>
    );
}

export default TeacherPage;
