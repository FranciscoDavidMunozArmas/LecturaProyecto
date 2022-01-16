import React from 'react'
import { useSpeechSynthesis } from "react-speech-kit";
import { palette, text } from '../libs/styles';
import { VOICE_ES } from '../libs/utils';

const styles = {
    container: {
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "row" as const,
        alignItems: "center",
        justifyContent: "start",
        margin: "10px 0"
    },
    subtitle: {
        fontSize: text.subtitle.fontSize,
        lineHeight: text.subtitle.lineHeight,
        color: palette.primary,
        fontWeight: text.subtitle.fontWeight,
        textAlign: "start" as const,
    }
}

interface Props {
    text: string,
    ref?: any,
}

function Subtitle(props: Props) {
    const { speak, cancel } = useSpeechSynthesis();

    const onSpeak = (text: string) => {
        speak({ text: text, voice: VOICE_ES });
    }

    return (
        <div style={styles.container} onMouseEnter={() => onSpeak(props.text)} onMouseLeave={() => cancel()} ref={props.ref}>
            <h1 style={styles.subtitle}>{props.text}</h1>
        </div>
    )
}

export default Subtitle
