import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Player from '../../components/Player';
import { CourseClass } from '../../models/CourseClass';

const styles = {
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center' as const,
        position: 'relative' as const
    }
}

function PlayCourse() {

    const [current, setcurrent] = useState<any>();
    const [audios, setaudios] = useState<CourseClass[]>([]);
    const location: any = useLocation();

    useEffect(() => {
        setaudios(location.state.audios);
        setcurrent(audios[location.state.index]);
        return () => { };
    }, []);


    return (
        <div style={styles.container}>
            <Player />
        </div>
    )
}

export default PlayCourse
