import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const styles = {
    container: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        zIndex: 9999,
        position: 'fixed' as const,
        transition: 'opacity 0.3s ease-in-out',
    }
}

interface Props {
    show?: boolean,
}

function LoadingContainer(props: Props) {

    return (<>
        <div className={!!props.show ? '' : 'gone'} style={styles.container}>
            <LoadingSpinner />
        </div>
    </>);
}

export default LoadingContainer;
