import React, { useEffect } from 'react'
import Subtitle from '../../components/Subtitle'
import Title from '../../components/Title'
import { decodeToken, getToken } from '../../libs/tokenInterceptor'
import { MY_COURSES_NAME, SUBSECTION_MY_COURSES_1_NAME, SUBSECTION_MY_COURSES_2_NAME } from '../../libs/utils'

const styles = {
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column' as const,
        overflowY: 'auto' as const,
    },
    moreContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'end',
    },
    moreButton: {
        fontSize: '1rem',
        fontStyle: 'italic',
        margin: '10px 15px',
    },
}

function MyCourses() {

    useEffect(() => {
        return () => {}
    }, [])

    return (
        <div style={styles.container}>
            <Title title={MY_COURSES_NAME} />
            <div>
                <Subtitle text={SUBSECTION_MY_COURSES_1_NAME} />
                <Subtitle text={SUBSECTION_MY_COURSES_2_NAME} />
            </div>
        </div>
    )
}

export default MyCourses
