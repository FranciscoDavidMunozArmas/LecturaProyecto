import React from 'react'
import Subtitle from '../../components/Subtitle'
import Title from '../../components/Title'
import { HOME_NAME, SUBSECTION_HOME_1_NAME, SUBSECTION_HOME_2_NAME, SUBSECTION_HOME_3_NAME } from '../../libs/utils'

const styles = {
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column' as const,
        overflowY: 'scroll' as const,
    }
}

function Home() {
    return (
        <>
            <div style={styles.container}>
                <Title title={HOME_NAME} />
                <Subtitle text={SUBSECTION_HOME_1_NAME} />
                <Subtitle text={SUBSECTION_HOME_2_NAME} />
                <Subtitle text={SUBSECTION_HOME_3_NAME} />
            </div>
        </>
    )
}

export default Home
