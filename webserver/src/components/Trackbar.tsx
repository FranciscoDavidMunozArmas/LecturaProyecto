import React from 'react'
import { palette } from '../libs/styles'

const styles = {
    container: {
        width: '100%',
        height: '3px',
        position: 'relative' as const,
        background: palette.track,
        borderRadius: '10px',
    },
    progress: {
        width: '1px',
        height: '3px',
        backgroundColor: palette.primary,
        position: 'absolute' as const,
        top: '0',
        left: '0',
        transition: 'width 0.3s linear',
    },
}

function Trackbar() {
    return (
        <div style={styles.container}>
            <div style={styles.progress}></div>
        </div>
    )
}

export default Trackbar
