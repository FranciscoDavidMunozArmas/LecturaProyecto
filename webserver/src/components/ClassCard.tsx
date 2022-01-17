import React from 'react'
import { useSpeechSynthesis } from "react-speech-kit";
import { BORDER_RADIOUS } from '../libs/styles'
import { formatTime, VOICE_ES } from '../libs/utils';
import { CourseClass } from '../models/CourseClass';

const styles = {
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center' as const,
        alignItems: 'center',
    },
    card: {
        width: '100%',
        maxWidth: '750px',
        height: 'auto',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        borderRadius: BORDER_RADIOUS,
        margin: '10px 20px',
        cursor: 'pointer',
    },
    cardHeader: {
        display: 'flex',
        flexDirection: 'row' as const,
        justifyContent: 'space-between' as const,
        alignItems: 'center',
        padding: '10px 20px',
    },
    cardBody: {
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        alignItems: 'left',
        padding: '10px 20px',
    },
    cardTitle: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    cardParagraph: {
        fontSize: '1rem',
        fontStyle: "italic",
    },
}

interface Props {
    courseClass: CourseClass,
}

function ClassCard(props: Props) {

    const { speak, cancel } = useSpeechSynthesis();

    const onSpeak = (text: string) => {
        speak({ text: text, voice: VOICE_ES });
    }

    const handleClick = () => {

    }

    return (
        <>
            <div style={styles.container}>
                <div style={styles.card} onClick={handleClick} onMouseEnter={() => onSpeak(props.courseClass.name)} onMouseLeave={() => cancel()}>
                    <div style={styles.cardHeader}>
                        <h1 style={styles.cardTitle}>{props.courseClass.name}</h1>
                        {/* <p style={styles.cardParagraph}>Tiempo: {formatTime(props.courseClass.file)}</p> */}
                        <p style={styles.cardParagraph}>Tiempo: {formatTime(0)}</p>
                    </div>
                    <div style={styles.cardBody}>
                        <audio src={props.courseClass.file} controls></audio>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClassCard
