import React, { ButtonHTMLAttributes } from 'react'
import { useSpeechSynthesis } from "react-speech-kit";
import { BORDER_RADIOUS, text, palette } from '../libs/styles';
import { TAB_KEY, ENTER_KEY, VOICE_ES } from '../libs/utils';

const styles = {
    button: {
        width: "100%",
        height: "auto",
        margin: "10px 5px",
        backgroundColor: palette.secondary,
        border: "none",
        color: palette.white,
        fontSize: text.paragraph.fontSize,
        lineHeight: text.paragraph.lineHeight,
        padding: "10px",
        borderRadius: BORDER_RADIOUS,
        cursor: "pointer",
    }
}

interface Props {
    text: string,
    type?: any,
    onClick?: (text: string) => void,
}

function Button(props: Props) {

    const { speak, cancel } = useSpeechSynthesis();

    const handleKeyDown = (event: any) => {
        if (event.keyCode === ENTER_KEY) {
        }
    }

    const onSpeak = (text: string) => {
        speak({ text: text, voice: VOICE_ES });
    }

    return (
        <>
            <button style={styles.button} type={props.type} onMouseEnter={() => onSpeak(props.text)} onMouseLeave={() => cancel()}>
                {props.text}
            </button>
        </>
    )
}

export default Button
