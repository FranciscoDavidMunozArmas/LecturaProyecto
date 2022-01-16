import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { checkToken } from '../libs/tokenInterceptor';
import Certificate from './subpages/Certificate';
import Course from './subpages/Course';
import Home from './subpages/Home';
import MyCourses from './subpages/MyCourses';
import PlayCourse from './subpages/PlayCourse';

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
            <Routes>
                <Route path="home" element={<Home />} />
                <Route path="mycourses" element={<MyCourses />} />
                <Route path="certificates" element={<Certificate />} />
                <Route path="course" element={<Course />} />
                <Route path="course/:course" element={<PlayCourse />} />
                <Route path="*" element={<Navigate to="home" />} />
            </Routes>
        </>
    )
}

export default Appmain
