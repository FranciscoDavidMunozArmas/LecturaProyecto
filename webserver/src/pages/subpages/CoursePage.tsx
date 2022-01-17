import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from '@material-ui/icons';
import Title from '../../components/Title';
import { Course } from '../../models/Course';
import { BACK_NAME, formatTime } from '../../libs/utils';
import BackButton from '../../components/BackButton';
import Subtitle from '../../components/Subtitle';
import ClassCard from '../../components/ClassCard';

const styles = {
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column' as const,
        overflowY: 'auto' as const,
    },
    topicHeader: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row' as const,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
    },
    topicTime: {
        width: 'auto',
        fontSize: '1rem',
        fontStyle: "italic",
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
                {
                    (course) ?
                        course.content.topics.map((topic, topicIndex: any) => {
                            return (
                                <div key={topicIndex}>
                                    <div style={styles.topicHeader}>
                                        <Subtitle text={topic.name} />
                                        <p style={styles.topicTime}>Tiempo: {formatTime(topic.duration)}</p>
                                    </div>
                                    {
                                        topic.classes.map((courseClass, index: any) => {
                                            return (
                                                <div key={index}>
                                                    <ClassCard courseClass={courseClass} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                        : null
                }
            </div>
        </>
    )
}

export default CoursePage
