import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSpeechSynthesis } from "react-speech-kit";
import { palette, text } from '../libs/styles';
import { VOICE_ES } from '../libs/utils';

interface Props {
    text: string,
    path?: string,
    ref?: any,
}

const styles = {
    container: {
        width: "100%",
        height: "auto",
        margin: "0.5rem 0",
    },
    link: {
        fontSize: text.link.fontSize,
        textStyle: "italic",
        textAlign: "start" as const,
        color: palette.primary,
        fontStyle: "italic",
        textDecoration: "underline",
    }

}

function LinkComponent(props: Props) {

    const { speak, cancel } = useSpeechSynthesis();

    const onSpeak = (text: string) => {
        speak({ text: text, voice: VOICE_ES });
    }

    return (
        <>
            <div onMouseEnter={() => onSpeak(props.text)} onMouseLeave={() => cancel()} style={styles.container} ref={props.ref}>
                <a style={styles.link} href={props.path}>{props.text}</a>
            </div>
        </>
    )
}

export default LinkComponent
