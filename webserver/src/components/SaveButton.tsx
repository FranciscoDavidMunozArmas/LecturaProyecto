import React, { useEffect, useState } from 'react'
import { useSpeechSynthesis } from "react-speech-kit";
import { Bookmark, BookmarkBorder } from '@material-ui/icons';
import { SAVED_NAME, SAVE_NAME, VOICE_ES } from '../libs/utils';

const styles = {
    container: {
        width: '100%',
        height: 'auto',
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'right',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row' as const,
        margin: '0 10px',
        cursor: 'pointer',
    },
    button: {
        fontStyle: 'italic'
    }
}

interface Props {
    status: boolean,
    onChange?: (value: boolean) => void;
}

function SaveButton(props: Props) {

    const [checked, setchecked] = useState(false);
    const { speak, cancel } = useSpeechSynthesis();

    const onClick = () => {
        setchecked(!checked);
        props.onChange?.(!checked);
    }

    const onSpeak = (text: string) => {
        speak({ text: text, voice: VOICE_ES });
    }

    useEffect(() => {
        setchecked(!!props.status);
        return () => { }
    }, [props.status])

    return (
        <div style={styles.container} onMouseEnter={() => (checked) ? onSpeak(SAVED_NAME) : onSpeak(SAVE_NAME)} onMouseLeave={() => cancel()}>
            <div style={styles.buttonContainer} onClick={onClick}>
                {
                    (checked) ?
                        <Bookmark /> :
                        <BookmarkBorder />
                }
                {
                    (checked)
                        ? <p style={styles.button}>{SAVED_NAME}</p>
                        : <p style={styles.button}>{SAVE_NAME}</p>

                }
            </div>
        </div>
    )
}

export default SaveButton
