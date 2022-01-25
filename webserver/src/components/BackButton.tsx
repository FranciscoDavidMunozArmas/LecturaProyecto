import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSpeechSynthesis } from 'react-speech-kit';
import { ChevronLeft } from '@material-ui/icons';
import { BACK_NAME, VOICE_ES } from '../libs/utils';

const styles = {
    backContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'end',
    },
    backButton: {
        display: 'flex',
        fontSize: '1rem',
        fontStyle: 'italic',
        margin: '10px 15px',
        alignItems: 'center',
    },
}

interface Props {
    onClick?: () => void;
}

function BackButton(props: Props) {

    const navigate = useNavigate();

    const { speak, cancel } = useSpeechSynthesis();

    const onBack = () => {
        props.onClick?.();        
        navigate(-1);
    }

    const onSpeak = (text: string) => {
        speak({ text: text, voice: VOICE_ES });
    }

    return (
        <div style={styles.backContainer} onMouseEnter={() => onSpeak(BACK_NAME)} onMouseLeave={() => cancel()}>
            <a style={styles.backButton} onClick={() => onBack()}><ChevronLeft /> {BACK_NAME}</a>
        </div>
    )
}

export default BackButton
