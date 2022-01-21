import { duration } from 'moment';
import React, { ChangeEvent, CSSProperties, HTMLAttributes, useEffect, useRef, useState } from 'react'
import { clearInterval } from 'timers';
import { palette } from '../libs/styles'
import { AUDIO_URI, formatMinutes, formatTime } from '../libs/utils';

const styles = {
    container: {
        margin: '2rem',
        width: '100%',
        height: '5px',
    },
    timeContainer: {
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'row' as const,
        justifyContent: 'space-between' as const,
        alignItems: 'center' as const,
    },
}

interface Props {
    duration: number,
    styles?: CSSProperties,
    value: number,
    onScrubEnd?: () => void,
    onChange?: (value: number) => void,
}

function Trackbar(props: Props) {

    return (
        <div style={styles.container}>
            <input
                type="range"
                value={props.value}
                step="1"
                min="0"
                max={props.duration ? props.duration : `${props.duration}`}
                onMouseUp={props.onScrubEnd}
                onKeyUp={props.onScrubEnd}
                onChange={(e: ChangeEvent<HTMLInputElement>) => { props.onChange?.(e.target.valueAsNumber) }}
                style={props.styles}
                className="trackbar"
            />
            <div style={styles.timeContainer}>
                <p>{formatMinutes(props.value)}</p>
                <p>{formatMinutes(props.duration ? props.duration : 0)}</p>
            </div>
        </div>
    )
}

export default Trackbar
