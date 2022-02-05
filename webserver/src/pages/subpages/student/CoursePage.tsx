import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useSpeechSynthesis } from "react-speech-kit";
import Title from '../../../components/Title';
import { Course } from '../../../models/Course';
import { ENTERING_COURSE_ERROR, formatTime, PATH_PLAYCOURSE, REQUIERMENTS_NAME, VOICE_ES } from '../../../libs/utils';
import BackButton from '../../../components/BackButton';
import Subtitle from '../../../components/Subtitle';
import ClassCard from '../../../components/ClassCard';
import SaveButton from '../../../components/SaveButton';
import { CourseClass } from '../../../models/CourseClass';
import { decodeToken, getToken } from '../../../libs/tokenInterceptor';
import { updateStudent } from '../../../services/student.service';
import { toastManager } from '../../../libs/toastManager';
import Paragraph from '../../../components/Paragraph';
import { StudentContext } from '../../../context/StudentContext';

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
    }
}

function CoursePage() {

    const [course, setcourse] = useState<Course>();
    const [saved, setsaved] = useState<boolean>(false);

    const location: any = useLocation();
    const navigate = useNavigate();
    const student = useContext(StudentContext);
    const { speak, cancel } = useSpeechSynthesis();

    const onClassClick = (audios: CourseClass[], position: number) => {
        if (saved) {
            let audioFiles: CourseClass[] = [];
            course?.content.topics.forEach((topic: any) => {
                audioFiles = audioFiles.concat(topic.classes);
            });
            const index = audioFiles.findIndex((audio: CourseClass, index: any) => {
                if (audio.id === audios[position].id) {
                    return index;
                }
            });
            navigate(`${PATH_PLAYCOURSE}`, { state: { audios: audioFiles, index: index, courseID: course?.id } });
        } else {
            toastManager.message(ENTERING_COURSE_ERROR);
            onSpeak(ENTERING_COURSE_ERROR);
        }
    }

    const onSaveClick = async (value: boolean) => {
        if (value && student && course) {
            student.courses.push({
                courseID: course.id,
                completed: [],
                status: false
            });
            const token: any = decodeToken(getToken());
            const studentId = token.token;
            updateStudent(studentId, student);
            setsaved(true);
        } else if (!value && student && course) {
            student.courses = student.courses.filter(c => c.courseID !== course.id);
            const token: any = decodeToken(getToken());
            const studentId = token.token;
            updateStudent(studentId, student);
            setsaved(false);
        }
    }

    const onSpeak = (text: string) => {
        speak({ text: text, voice: VOICE_ES });
    }

    useEffect(() => {
        setcourse(location.state.course);
        setsaved(location.state.saved);
        if (!saved && student && course) {
            setsaved(!!student.courses.find(c => c.courseID === course.id));
        }
        return () => { }
    }, []);

    return (
        <>
            <div style={styles.container}>
                <BackButton />
                <Title title={(course) ? course.name : "Course"} />
                <Paragraph text={(course) ? course.content.description : "Course"} />
                <Subtitle text={REQUIERMENTS_NAME} />
                {
                    (course) ? course.content.requirements.map((objective, index) => {
                        return <Paragraph key={index} text={objective} style={{ marginLeft: '2rem' }} />
                    }) : null
                }
                <SaveButton onChange={onSaveClick} status={saved} />
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
                                                    <ClassCard courseClass={courseClass} onClick={() => onClassClick(topic.classes, index)} />
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
