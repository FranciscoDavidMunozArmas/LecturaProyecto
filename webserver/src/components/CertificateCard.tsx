import { HelpRounded } from '@material-ui/icons';
import React from 'react';
import { useSpeechSynthesis } from "react-speech-kit";
import { BORDER_RADIOUS } from '../libs/styles';
import { VOICE_ES } from '../libs/utils';
import { Certificate } from '../models/Certificate';

const styles = {
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row' as const,
        justifyContent: 'center' as const,
        alignItems: 'center',
    },
    card: {
        width: '100%',
        maxWidth: '750px',
        height: 'auto',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        borderRadius: BORDER_RADIOUS,
        margin: '10px 20px',
        cursor: 'pointer',
    },
    cardHeader: {
        display: 'flex',
        flexDirection: 'row' as const,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        padding: '10px 20px',
    },
    cardBody: {
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center' as const,
        textAlign: 'center' as const,
        padding: '10px 20px',
    },
    cardTitle: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    status: {
        color: "rgb(0 160 20)",
        fontWeight: 'bold',
        fontSize: '0.75rem',
    },
    icon: {
        margin: "0 10px",
        fontSize: "2rem",
    }
}


interface Props {
    certificate: Certificate,
    onClick?: () => void,
}

function CertificateCard(props: Props) {

    const STATUS = "COMPLETADO";
    const HELP = "Haz click para descargar el certificado";

    const { speak, cancel } = useSpeechSynthesis();

    const onSpeak = (text: string) => {
        speak({ text: text, voice: VOICE_ES });
    }

    return <>
        <div style={styles.container}>
            <div style={styles.card} 
            onClick={() => props.onClick?.()}
            onMouseEnter={() => onSpeak(`${props.certificate.course.name} ${STATUS}`)} 
            onMouseLeave={() => cancel()}>
                <div style={styles.cardHeader}>
                    <h1 style={styles.cardTitle}>
                        {props.certificate.course.name}
                    </h1>
                </div>
                <div style={styles.cardBody}>
                    <p style={styles.status}>{STATUS}</p>
                </div>
            </div>
            <div className='icon' onMouseEnter={() => onSpeak(HELP)} onMouseLeave={() => cancel()}>
                <HelpRounded style={styles.icon} />
            </div>
        </div>
    </>;
}

export default CertificateCard;
