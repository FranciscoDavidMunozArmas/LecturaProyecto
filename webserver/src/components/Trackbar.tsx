import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { clearInterval } from 'timers';
import { palette } from '../libs/styles'
import { AUDIO_URI, formatTime } from '../libs/utils';

const styles = {
    container: {
        width: '100%',
        height: '3px',
        position: 'relative' as const,
        background: palette.track,
        borderRadius: '100%',
    },
    progress: {
        width: '1px',
        height: '3px',
        backgroundColor: palette.primary,
        borderRadius: '100%',
        position: 'absolute' as const,
        top: '0',
        left: '0',
        transition: 'width 0.3s linear',
    },
}

interface Props {
    audio: string,
    autoPlay?: boolean,
}

function Trackbar(props: Props) {

    return (
        <div style={styles.container}>
            <div style={styles.progress}></div>
        </div>
    )
}

export default Trackbar
