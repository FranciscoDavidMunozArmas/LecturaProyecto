import React, { useEffect, useRef, useState } from 'react';
import PlayerControls from './PlayerControls';

const styles = {
    container: {
        width: '100%',
        height: "100%",
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
    },
}

interface Props {
    audios: any[]
}

function Player() {

    const audioRef: any = useRef();

    const [isPlaying, setisPlaying] = useState<boolean>(false);

    const onNext = () => {

    }

    const onPrevious = () => {

    }

    const onPause = () => {
        setisPlaying(false);
    }

    const onPlay = () => {
        setisPlaying(true);
    }

    useEffect(() => {
        if (isPlaying) {
            // audioRef.current.play();
        } else {
            // audioRef.current.pause();
        }
        return () => { };
    }, []);

    return (<>
        <div>
            <PlayerControls onNext={onNext} onPause={onPause} onPlay={onPlay} onPrevious={onPrevious} />
        </div>
    </>);
}

export default Player;
