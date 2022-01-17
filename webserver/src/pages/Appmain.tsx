import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Menubar from '../components/Menubar';
import { routes } from '../libs/routes';
import { palette } from '../libs/styles';
import { checkToken } from '../libs/tokenInterceptor';
import { PATH_CERTIFICATES, PATH_COURSE, PATH_HOME, PATH_MY_COURSES } from '../libs/utils';
import Certificate from './subpages/Certificate';
import Course from './subpages/Course';
import Home from './subpages/Home';
import MyCourses from './subpages/MyCourses';
import PlayCourse from './subpages/PlayCourse';

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

    const navigate = useNavigate();

    useEffect(() => {
        if (!checkToken()) {
            navigate("/login");
        }
        return () => { }
    }, [])

    return (
        <>
            <div style={styles.container}>
                <div style={styles.menuContainer}>
                    <Menubar children={routes.children}/>
                </div>
                <div style={styles.contentContainer}>
                    <Routes>
                        <Route path={PATH_HOME} element={<Home />} />
                        <Route path={PATH_MY_COURSES} element={<MyCourses />} />
                        <Route path={PATH_CERTIFICATES} element={<Certificate />} />
                        <Route path={PATH_COURSE} element={<Course />} />
                        <Route path={`${PATH_COURSE}/playcourse`} element={<PlayCourse />} />
                        <Route path="*" element={<Navigate to={PATH_HOME} />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default Appmain
