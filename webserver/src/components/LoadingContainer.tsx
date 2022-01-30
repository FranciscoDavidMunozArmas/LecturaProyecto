import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React, { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

const styles = {
    container: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        position: 'fixed' as const,
        transition: 'opacity 0.3s ease-in-out',
    },
    active: {
        opacity: 1,
        zIndex: 9999,
    },
    gone: {
        opacity: 0,
        zIndex: -1,
    }
}

interface Props {
    show?: boolean,
}

function LoadingContainer(props: Props) {

    const [css, setcss] = useState<CSSProperties>({});

    useEffect(() => {
        if(props.show) {
            setcss({ ...styles.active, ...styles.container });
        } else {
            setcss({ ...styles.gone, ...styles.container });
        }
      return () => {};
    }, [props.show]);
    

    return (<>
        <div style={css}>
            <LoadingSpinner />
        </div>
    </>);
}

export default LoadingContainer;
