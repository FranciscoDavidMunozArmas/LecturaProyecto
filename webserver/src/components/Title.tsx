import React, { useEffect } from 'react'
import { useSpeechSynthesis } from "react-speech-kit";
import { palette, text } from '../libs/styles';
import { VOICE_ES } from '../libs/utils';

interface Props {
    title: string,
    start?: boolean,
    ref?: any,
}

const styles = {
    container: {
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "row" as const,
        alignItems: "center",
        justifyContent: "center",
        margin: "10px 0"
    },
    title: {
        fontSize: text.title.fontSize,
        lineHeight: text.title.lineHeight,
        color: palette.primary,
        fontWeight: text.title.fontWeight,
        textAlign: "center" as const,
    }
}

function Title(props: Props) {

    const { speak, cancel } = useSpeechSynthesis();

    const onSpeak = (text: string) => {
        speak({ text: text, voice: VOICE_ES });
    }

    return (
        <div style={styles.container} onMouseEnter={() => onSpeak(props.title)} onMouseLeave={() => cancel()} ref={props.ref}>
            <h1 style={styles.title}>{props.title}</h1>
        </div>
    )
}

export default Title
