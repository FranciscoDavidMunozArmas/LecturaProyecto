import React from 'react'
import { useSpeechSynthesis } from "react-speech-kit";
import { MORE_NAME, VOICE_ES } from '../libs/utils'

const styles = {
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

interface Props {
    onClick?: () => void
}

function MoreButton(props: Props) {

    const { speak, cancel } = useSpeechSynthesis();

    const onClick = () => {
        props.onClick && props.onClick()
    }

    const onSpeak = (text: string) => {
        speak({ text: text, voice: VOICE_ES });
    }

    return (
        <div style={styles.moreContainer}
        onMouseEnter={() => { onSpeak(MORE_NAME) }}
        onMouseLeave={() => { cancel() }}>
        {
            <a style={styles.moreButton}
                onClick={onClick}
            >{MORE_NAME}</a>
        }
    </div>
    )
}

export default MoreButton
