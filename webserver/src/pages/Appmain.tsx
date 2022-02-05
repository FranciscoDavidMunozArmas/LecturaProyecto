import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useSpeechSynthesis } from 'react-speech-kit';
import Menubar from '../components/Menubar';
import { StudentContext, StudentProvider } from '../context/StudentContext';
import { routes } from '../libs/routes';
import { palette } from '../libs/styles';
import { toastManager } from '../libs/toastManager';
import { checkToken, decodeToken, getToken } from '../libs/tokenInterceptor';
import { GETTING_DATA_ERROR, PATH_CERTIFICATES, PATH_COURSE, PATH_HOME, PATH_MY_COURSES, PATH_PLAYCOURSE, VOICE_ES } from '../libs/utils';
import { Student, studentConverter } from '../models/Student';
import { getStudent } from '../services/student.service';
import CertificatePage from './subpages/student/CertificatePage';
import CoursePage from './subpages/student/CoursePage';
import Home from './subpages/student/Home';
import MyCourses from './subpages/student/MyCourses';
import PlayCourse from './subpages/student/PlayCourse';

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

function Appmain() {

    const [currentStudent, setcurrentStudent] = useState<Student>();

    const navigate = useNavigate();
    const { speak, cancel } = useSpeechSynthesis();

    const getData = async () => {
        const token: any = decodeToken(getToken());
        try {
            const data = await getStudent(token.token);
            setcurrentStudent(studentConverter.fromJSON(data.data));
        } catch (error: any) {
            toastManager.error(GETTING_DATA_ERROR);
            onSpeak(GETTING_DATA_ERROR);
        }
    }

    const onSpeak = (text: string) => {
        speak({ text, voice: VOICE_ES, rate: 1.2 });
    }

    useEffect(() => {
        console.log('Appmain');
        if (!checkToken()) {
            navigate("/login");
            return;
        }
        getData();
        return () => { }
    }, []);

    return (
        <>
            <StudentProvider student={currentStudent}>
                <div style={styles.container}>
                    <div style={styles.menuContainer}>
                        <Menubar children={routes.children} />
                    </div>
                    <div style={styles.contentContainer}>
                        <Routes>
                            <Route path={PATH_HOME} element={<Home />} />
                            <Route path={PATH_MY_COURSES} element={<MyCourses />} />
                            <Route path={PATH_CERTIFICATES} element={<CertificatePage />} />
                            <Route path={PATH_COURSE} element={<CoursePage />} />
                            <Route path={`${PATH_COURSE}/${PATH_PLAYCOURSE}`} element={<PlayCourse />} />
                            <Route path="/*" element={<Navigate to={PATH_HOME} />} />
                        </Routes>
                    </div>
                </div>
            </StudentProvider>
        </>
    )
}


export default Appmain
