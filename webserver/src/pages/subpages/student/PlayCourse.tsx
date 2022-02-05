import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSpeechSynthesis } from 'react-speech-kit';
import BackButton from '../../../components/BackButton';
import Player from '../../../components/Player';
import { StudentContext } from '../../../context/StudentContext';
import { text } from '../../../libs/styles';
import { decodeToken, getToken } from '../../../libs/tokenInterceptor';
import { AUDIO_URI, VOICE_ES } from '../../../libs/utils';
import { CourseClass, courseClassConverter } from '../../../models/CourseClass';
import { Student } from '../../../models/Student';
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
    const [courseID, setcourseID] = useState<String>();
    const [stop, setstop] = useState<boolean>(false);

    const location: any = useLocation();
    const student = useContext(StudentContext);

    const { speak, cancel } = useSpeechSynthesis();

    const onNext = () => {
        completeCourse(current);
        if (current < audios.length - 1) {
            setcurrent(current + 1);
        } else {
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
            <Player
                audio={`${`${AUDIO_URI}${getData()[current].file}`}`}
                onNext={onNext}
                onPrevious={onPrevious}
                stop={stop} />
            <div style={styles.classNameContainer}>
                <h1 style={styles.className} onMouseEnter={() => onSpeak(getData()[current].name)} onMouseLeave={() => cancel()}>{getData()[current].name}</h1>
            </div>
        </div>
    )
}

export default PlayCourse
