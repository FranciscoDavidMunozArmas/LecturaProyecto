import React from 'react'
import { useSpeechSynthesis } from "react-speech-kit";
import { TextField } from '@material-ui/core';
import { useState } from 'react';
import { TAB_KEY } from '../libs/utils';

interface Props {
    type?: string | undefined,
    hint: string,
    onChange?: (text: string) => void,
    getText?: () => string
}

function InputText(props: Props) {

    const [text, settext] = useState<string>("");

    const { speak } = useSpeechSynthesis();

    const handleChange = (event: any) => {
        settext(event.target.value);
        props.onChange?.(text);
    }

    const handleKeyDown = (event: any) => {
        console.log(event.keyCode);
        if (event.keyCode === TAB_KEY) {
            onSpeak(text);
        }
    }

    const onSpeak = (text: string) => {
        speak({ text: text });
    }

    const getText = (): string => {
        return text;
    }

    return (
        <>
            <div onMouseEnter={() => onSpeak(props.hint)}>
                <TextField id="text" label={props.hint} variant="outlined" type={props.type} onChange={handleChange} onKeyDown={handleKeyDown} />
            </div>
        </>
    );
}

export default InputText;
