import React from 'react'
import { useSpeechSynthesis } from "react-speech-kit";
import { TextField } from '@material-ui/core';
import { useState } from 'react';
import { HelpRounded } from '@material-ui/icons';
import { TAB_KEY, VOICE_ES } from '../libs/utils';

const styles = {
    container: {
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "row" as const,
        alignItems: "center",
        justifyContent: "center",
        margin: "5px 0"
    },
    input: {
        width: "100%",
        alignItems: "center",
    },
    icon: {
        margin: "0 10px",
        fontSize: "2rem",
    }
}

interface Props {
    help?: string,
    type?: string | undefined,
    hint: string,
    onChange?: (text: string) => void
}

function InputText(props: Props) {

    const [text, settext] = useState<string>("");

    const { speak, cancel } = useSpeechSynthesis();

    const handleChange = (event: any) => {
        settext(event.target.value);
        props.onChange?.(text);
    }

    const handleKeyDown = (event: any) => {
        if (event.keyCode === TAB_KEY) {
            onSpeak(text);
        }
    }

    const onSpeak = (text: string) => {
        speak({ text: text, voice: VOICE_ES });
    }

    return (
        <>
            <div style={styles.container}>
                <TextField id="text" placeholder={props.hint} variant="outlined" type={props.type} onMouseEnter={() => onSpeak(props.hint)} onMouseLeave={() => cancel()} onChange={handleChange} onKeyDown={handleKeyDown} style={styles.input} />
                <div onMouseEnter={() => onSpeak((props.help) ? props.help : "")} onMouseLeave={() => cancel()}><HelpRounded style={styles.icon} /></div>
            </div>
        </>
    );
}

export default InputText;
