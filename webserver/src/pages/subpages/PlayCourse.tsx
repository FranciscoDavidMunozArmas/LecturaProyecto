import React from 'react'
import Player from '../../components/Player';

const styles = {
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center' as const,
        position: 'relative' as const
    }
}

function PlayCourse() {
    return (
        <div style={styles.container}>
            <Player />
        </div>
    )
}

export default PlayCourse
