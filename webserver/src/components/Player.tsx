import React, { useEffect, useRef, useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { palette } from '../libs/styles';
import { toastManager } from '../libs/toastManager';
import { AUDIO_ERROR, AUDIO_URI, VOICE_ES } from '../libs/utils';
import PlayerControls from './PlayerControls';
import PlayerDetails from './PlayerDetails';
import Trackbar from './Trackbar';

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

    const [isPlaying, setisPlaying] = useState<boolean>(true);
    const [trackProgress, settrackProgress] = useState<number>(0);

    const { speak, cancel } = useSpeechSynthesis();

    const audioRef = useRef(new Audio(props.audio));
    const intervalRef = useRef<NodeJS.Timeout>(0 as any);
    const isReady = useRef<boolean>(false);
    const { duration } = audioRef.current;
    const currentPercentage = duration
        ? `${(trackProgress) / duration * 100}%`
        : '0%';
    const trackStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, ${palette.trackBackgroundDone}), color-stop(${currentPercentage}, ${palette.trackBackgroundLeft}))`;

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

    const startTimer = () => {
        clearInterval(intervalRef.current);
        
        intervalRef.current = setInterval(() => {
            if(audioRef.current.ended) {
                onNext();
            } else {
                settrackProgress(audioRef.current.currentTime);
            }
        }, 1000);
    }

    const onScrub = (value: number) => {
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;
        settrackProgress(value);
    }


    const onScrubEnd = () => {
        if(!isPlaying) {
            setisPlaying(true);
        }
        startTimer();
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
        audioRef.current.pause();
        
        audioRef.current = new Audio(props.audio);
        settrackProgress(audioRef.current.currentTime);
        
        if(isReady.current) {
            audioRef.current.play();
            setisPlaying(true);
            startTimer();
        } else {
            isReady.current = true;
        }

        return () => { };
    }, [props.audio]);


    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
            startTimer();
        } else {
            audioRef.current.pause();
        }
        return () => { };
    }, [isPlaying]);

    return (<>
        <div style={styles.container}>
            <div style={styles.innerContainer}>
                <PlayerDetails />
                <Trackbar 
                value={trackProgress}
                duration={audioRef.current.duration}
                onChange={onScrub}
                onScrubEnd={onScrubEnd}
                styles={{ background: trackStyling }} />
                <PlayerControls status={isPlaying} onNext={onNext} onPause={onPause} onPlay={onPlay} onPrevious={onPrevious} />
                <audio ref={audioRef} onError={handleError} />
            </div>
        </div>
    </>);
}

export default Player;
