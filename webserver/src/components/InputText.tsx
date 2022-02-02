import React, { ChangeEvent, useEffect } from 'react'
import { useSpeechSynthesis } from "react-speech-kit";
import { useState } from 'react';
import { HelpRounded } from '@material-ui/icons';
import { TAB_KEY, VOICE_ES } from '../libs/utils';
import { BORDER_RADIOUS, text } from '../libs/styles';

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
    input: {
        width: "100%",
        minWidth: "200px",
        maxWidth: "300px",
        padding: "5px 20px",
        alignItems: "center",
        fontSize: text.paragraph.fontSize,
        lineHeight: text.paragraph.lineHeight,
        borderRadius: BORDER_RADIOUS,
        border: "1px solid #ccc",
    },
    icon: {
        margin: "0 10px",
        fontSize: "2rem",
    }
}

interface Props {
    value?: string,
    help?: string,
    name?: string,
    ref?: any,
    type?: string | undefined,
    required?: boolean,
    hint: string,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

function InputText(props: Props) {

    const [text, settext] = useState<string>("");
    const { speak, cancel } = useSpeechSynthesis();

    const handleChange = (event: any) => {
        settext(event.target.value);
        props.onChange?.(event);
    }

    const handleKeyDown = (event: any) => {
        if (event.keyCode === TAB_KEY && props.type !== "password") {
            onSpeak(text);
        }
    }

    const onSpeak = (text: string) => {
        speak({ text: text, voice: VOICE_ES });
    }

    useEffect(() => {
        if (props.value) {
            settext(props.value);
        } else {
            settext("");
        }
        return () => { };
    }, [props.value]);


    return (
        <>
            <div style={styles.container}>
                <input
                    placeholder={props.hint}
                    type={props.type}
                    onMouseEnter={() => onSpeak(props.hint)}
                    onMouseLeave={() => cancel()}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    style={styles.input}
                    name={props.name}
                    value={text}
                    required={props.required}
                    ref={props.ref} />
                <div className='icon' onMouseEnter={() => onSpeak((props.help) ? props.help : "")} onMouseLeave={() => cancel()}><HelpRounded style={styles.icon} /></div>
            </div>
        </>
    );
}

export default InputText;
