import React, { useEffect, useRef, useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { toastManager } from '../libs/toastManager';
import { AUDIO_ERROR, AUDIO_URI, VOICE_ES } from '../libs/utils';
import PlayerControls from './PlayerControls';
import PlayerDetails from './PlayerDetails';

const styles = {
    container: {
        width: '100%',
        height: "100%",
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
    },
    innerContainer: {
        width: '100%',
        height: "100%",
        maxWidth: '400px',
        maxHeight: '700px',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
    }
}

interface Props {
    audio: string,
    onNext?: () => void,
    onPrevious?: () => void
}

function Player(props: Props) {

    const audioRef = useRef(new Audio());

    const [isPlaying, setisPlaying] = useState<boolean>(true);

    const { speak, cancel } = useSpeechSynthesis();

    const onNext = () => {
        audioRef.current.pause();
        props.onNext?.();
    }

    const onPrevious = () => {
        audioRef.current.pause();
        props.onNext?.();
    }

    const onPause = () => {
        setisPlaying(false);
    }

    const onPlay = () => {
        setisPlaying(true);
    }

    const handleError = () => {
        audioRef.current.pause();
        toastManager.error(AUDIO_ERROR);
        onSpeak(AUDIO_ERROR);
    }

    const onSpeak = (text: string) => {
        speak({ text: text, voice: VOICE_ES });
    }

    useEffect(() => {
        audioRef.current = new Audio(props.audio);
        setisPlaying(true);
        return () => { };
    }, [props.audio]);


    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
        return () => { };
    }, [isPlaying]);

    return (<>
        <div style={styles.container}>
            <div style={styles.innerContainer}>
                <PlayerDetails />
                <PlayerControls status={isPlaying} onNext={onNext} onPause={onPause} onPlay={onPlay} onPrevious={onPrevious} />
                <audio ref={audioRef} onError={handleError}/>
            </div>
        </div>
    </>);
}

export default Player;
