import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const styles = {
    container: {
        width: '100%',
        heigth: '100vh',
        backgroundColor: '#fff',
        zIndex: 9999,
    }
}

function LoadingContainer() {
    return (<>
        <div style={styles.container}>
            <LoadingSpinner />
        </div>
    </>);
}

export default LoadingContainer;
