import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React from 'react';
import { useSpeechSynthesis } from "react-speech-kit";
import { text } from '../libs/styles';
import { VOICE_ES } from '../libs/utils';

const styles = {
    container: {
        width: '100%',
        height: 'auto',
        display: 'flex',
        alignItems: 'start',
    },
    paragraph: {
        fontStyle: 'italic',
        fontSize: text.paragraph.fontSize,
        lineHeight: text.paragraph.lineHeight
    }
}

interface Props {
    text: string;
    style?: CSSProperties
}

function Paragraph(props: Props) {

    const { speak, cancel } = useSpeechSynthesis();

    const onSpeak = (text: string) => {
        speak({ text: text, voice: VOICE_ES });
    }

    return (<>
        <div style={styles.container} onMouseEnter={() => onSpeak(props.text)} onMouseLeave={() => cancel()}>
            <p style={{...styles.paragraph, ...props.style}}>
                {props.text}
            </p>
        </div>
    </>);
}

export default Paragraph;
