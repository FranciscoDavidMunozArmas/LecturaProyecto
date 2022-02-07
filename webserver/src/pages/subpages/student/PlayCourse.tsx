import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSpeechSynthesis } from 'react-speech-kit';
import BackButton from '../../../components/BackButton';
import LoadingSpinner from '../../../components/LoadingSpinner';
import Player from '../../../components/Player';
import { StudentContext } from '../../../context/StudentContext';
import { text } from '../../../libs/styles';
import { toastManager } from '../../../libs/toastManager';
import { decodeToken, getToken } from '../../../libs/tokenInterceptor';
import { AUDIO_URI, GENERATE_CERTIFICATE_SUCCESS, SEND_DATA_ERROR, VOICE_ES } from '../../../libs/utils';
import { Course } from '../../../models/Course';
import { CourseClass, courseClassConverter } from '../../../models/CourseClass';
import { Student } from '../../../models/Student';
import { createCertificate } from '../../../services/certificate.service';
import { updateStudent } from '../../../services/student.service';

const styles = {
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center' as const,
        position: 'relative' as const
    },
    classNameContainer: {
        position: 'absolute' as const,
        bottom: '0',
        right: '0'
    },
    className: {
        fontSize: text.title.fontSize,
        lineHeight: text.title.lineHeight,
        fontStyle: text.title.fontStyle,
        fontWeight: text.title.fontWeight,
    }
}

function PlayCourse() {

    const [current, setcurrent] = useState<number>(0);
    const [audios, setaudios] = useState<CourseClass[]>([]);
    const [courseID, setcourseID] = useState<string>();
    const [stop, setstop] = useState<boolean>(false);

    const location: any = useLocation();
    const navigate = useNavigate();
    const student = useContext(StudentContext);

    const { speak, cancel } = useSpeechSynthesis();

    const onNext = () => {
        completeCourse(current);
        if (current < audios.length - 1) {
            setcurrent(current + 1);
        } else {
            navigate(-1);
            setstop(true);
            setcurrent(0);
        }
    }

    const onPrevious = () => {
        if (0 < current) {
            setcurrent(current - 1);
        } else {
            setcurrent(audios.length - 1);
        }
    }

    const completeCourse = async (index: number) => {
        const token: any = decodeToken(getToken());
        const course = student?.courses.find(c => c.courseID === courseID);
        if (course) {
            const completed = course.completed.find(data => data === audios[index].id);
            if (!completed) {
                student?.courses.find(c => c.courseID === courseID)?.completed.push(audios[index].id);
                await updateStudent(token.token, student as Student);
            }
            if (courseID && course.completed.length === audios.length) {
                onGenerateCertificate(courseID);
            }
        }
    }

    const onGenerateCertificate = (courseID: string) => {
        if (student) {
            if (student.certifications.includes(courseID)) {
                toastManager.message(`Certificado ya generado`);
                onSpeak(`Certificado ya generado`);
            } else {
                generateCertificate(courseID);
            }
        }
    }

    const generateCertificate = async (courseID: string) => {
        const token: any = decodeToken(getToken());
        try {
            if (student) {
                student.certifications.push(courseID);
                await createCertificate(courseID);
                await updateStudent(token.token, student);
                toastManager.success(GENERATE_CERTIFICATE_SUCCESS);
                onSpeak(GENERATE_CERTIFICATE_SUCCESS);
            }
        } catch (error: any) {
            toastManager.error(SEND_DATA_ERROR);
            onSpeak(SEND_DATA_ERROR);
        }
    }

    const getData = () => {
        return location.state.audios.map(courseClassConverter.fromJSON);
    }

    const onSpeak = (text: string) => {
        speak({ text, voice: VOICE_ES });
    }

    useEffect(() => {
        setaudios(getData());
        setcurrent(location.state.index);
        setcourseID(location.state.courseID);
        return () => { };
    }, []);

    return (
        <div style={styles.container}>
            <BackButton onClick={() => setstop(true)} />
            {
                console.log(current)
            }
            {
                (!audios[current]) ?
                    <LoadingSpinner /> :
                    <>
                        <Player
                            audio={`${AUDIO_URI}${audios[current].file}`}
                            onNext={onNext}
                            onPrevious={onPrevious}
                            stop={stop} />
                        <div style={styles.classNameContainer}>
                            {/* <h1 style={styles.className} onMouseEnter={() => onSpeak(getData()[current].name)} onMouseLeave={() => cancel()}>{getData()[current].name}</h1> */}
                        </div>
                    </>
            }
        </div>
    )
}

export default PlayCourse
