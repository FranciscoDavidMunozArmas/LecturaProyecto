import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from '@material-ui/icons';
import Title from '../../components/Title';
import { Course } from '../../models/Course';
import { BACK_NAME } from '../../libs/utils';
import BackButton from '../../components/BackButton';

const styles = {
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column' as const,
        overflowY: 'auto' as const,
    },
    backContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'end',
    },
    backButton: {
        display: 'flex',
        fontSize: '1rem',
        fontStyle: 'italic',
        margin: '10px 15px',
        alignItems: 'center',
    },
}

function CoursePage() {

    const [course, setcourse] = useState<Course>();

    const location: any = useLocation();

    useEffect(() => {
        setcourse(location.state.course);
        return () => { }
    }, []);

    return (
        <>
            <div style={styles.container}>
                <BackButton />
                <Title title={(course) ? course.name : "Course"} />
            </div>
        </>
    )
}

export default CoursePage
