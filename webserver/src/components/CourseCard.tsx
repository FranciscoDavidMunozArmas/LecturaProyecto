import React from 'react'
import { useSpeechSynthesis } from "react-speech-kit";
import { BORDER_RADIOUS } from '../libs/styles'
import { formatTime, GENERATE_CERTIFICATE_NAME, VOICE_ES } from '../libs/utils'
import { Course } from '../models/Course'

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
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1)',
        borderRadius: BORDER_RADIOUS,
        cursor: 'pointer',
        margin: '2rem 1rem',
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
        fontSize: '2rem',
        fontWeight: 'bold',
    },
    cardSubtitle: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        fontStyle: "italic",
    },
    cardParagraph: {
        fontSize: '1.2rem',
        fontStyle: "italic",
    },
    certificate: {
        padding: '10px 0',
        display: 'flex',
        justifyContent: 'center',
        cursor: 'pointer',
    }
}

interface Props {
    course: Course,
    completed?: number,
    onClick?: (course: Course) => void,
    onCertificate?: (course: Course) => void,
}

function CourseCard(props: Props) {

    const { speak, cancel } = useSpeechSynthesis();

    const showDescription = (text: string) => {
        if (text.length > 64) {
            return text.slice(0, text.length * 0.8) + "...";
        }
        return text;
    }

    const handleClick = () => {
        props.onClick?.(props.course);
    }

    const onSpeak = (text: string) => {
        speak({ text: text, voice: VOICE_ES });
    }

    return (
        <>
            <div style={styles.container}>
                <div style={styles.card}>
                    <div onClick={handleClick} 
                    onMouseEnter={() => onSpeak((!props.completed) ? props.course.name : `${props.course.name} completo al ${props.completed}%`)} 
                    onMouseLeave={() => cancel()}>
                        <div style={styles.cardHeader}>
                            <h1 style={styles.cardTitle}>{props.course.name}</h1>
                            {(props.completed) ? <p style={styles.cardParagraph}>{props.completed} %</p> : null}
                            <p style={styles.cardParagraph}>Tiempo: {formatTime(props.course.duration)}</p>
                        </div>
                        <div style={styles.cardBody}>
                            <h2 style={styles.cardSubtitle}>Descripcion</h2>
                            <p style={styles.cardParagraph}>{showDescription(props.course.content.description)}</p>
                        </div>
                    </div>
                    {
                        props.completed === 100 ?
                            (<div style={styles.certificate}
                                onClick={() => props.onCertificate?.(props.course)}
                                onMouseEnter={() => onSpeak(GENERATE_CERTIFICATE_NAME)}
                                onMouseLeave={() => cancel()}>
                                <h1 style={styles.cardSubtitle}>{GENERATE_CERTIFICATE_NAME}</h1>
                            </div>) : null
                    }
                </div>
            </div>
        </>
    )
}

export default CourseCard
