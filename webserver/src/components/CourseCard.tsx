import React from 'react'
import { BORDER_RADIOUS } from '../libs/styles'
import { formatTime } from '../libs/utils'
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
        height: '380px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        borderRadius: BORDER_RADIOUS,
        margin: '10px 20px',
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

}

interface Props {
    course: Course
}

function CourseCard(props: Props) {

    const showDescription = (text: string) => {
        if (text.length > 64) {
            return text.slice(0, text.length * 0.8) + "...";
        }
        return text;
    }

    return (
        <>
            <div style={styles.container}>
                <div style={styles.card}>
                    <div style={styles.cardHeader}>
                        <h1 style={styles.cardTitle}>{props.course.name}</h1>
                        <p style={styles.cardParagraph}>Tiempo: {formatTime(props.course.duration)}</p>
                    </div>
                    <div style={styles.cardBody}>
                        <h2 style={styles.cardSubtitle}>Descripcion</h2>
                        <p style={styles.cardParagraph}>{showDescription(props.course.content.description)}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseCard
