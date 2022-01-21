import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useSpeechSynthesis } from 'react-speech-kit';
import BackButton from '../../components/BackButton';
import Player from '../../components/Player';
import { text } from '../../libs/styles';
import { AUDIO_URI, VOICE_ES } from '../../libs/utils';
import { CourseClass, courseClassConverter } from '../../models/CourseClass';

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

    const location: any = useLocation();

    const { speak, cancel } = useSpeechSynthesis();

    const onNext = () => {
        setcurrent(current + 1);
        if (audios.length - 1 <= current) {
            setcurrent(0);
        }
    }

    const onPrevious = () => {
        setcurrent(current - 1);
        if (current <= 0) {
            setcurrent(0);
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
        return () => { };
    }, []);

    return (
        <div style={styles.container}>
            <BackButton />
            <Player audio={`${`${AUDIO_URI}${getData()[current].file}`}`} onNext={onNext} onPrevious={onPrevious} />
            <div style={styles.classNameContainer}>
                <h1 style={styles.className} onMouseEnter={() => onSpeak(getData()[current].name)} onMouseLeave={() => cancel()}>{getData()[current].name}</h1>
            </div>
        </div>
    )
}

export default PlayCourse
