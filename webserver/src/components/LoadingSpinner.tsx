import React from 'react';
import { palette } from '../libs/styles';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
    },
    spinnerContainer: {
        height: '75px',
        position: 'relative' as const,
    },
    itemContainer: {
        width: 'auto',
        height: '75px',
        position: 'absolute' as const,
        top: 0,
    },
    circle: {
        width: '15px',
        height: '15px',
        borderRadius: '100%',
        margin: '2px',
        backgroundColor: palette.primary,
    },
    title:{
        fontSize: '1.4rem',
    }
}

function LoadingSpinner() {
    return (<>
        <div style={styles.container}>
            <div style={styles.spinnerContainer}>
                <div className='spin first' style={styles.itemContainer}>
                    <div className="loading-item first" style={styles.circle} />
                </div>
                <div className='spin third' style={styles.itemContainer}>
                    <div className="loading-item third" style={styles.circle} />
                </div>
                <div className='spin fifth' style={styles.itemContainer}>
                    <div className="loading-item fifth" style={styles.circle} />
                </div>
                <div className='spin seventh' style={styles.itemContainer}>
                    <div className="loading-item seventh" style={styles.circle} />
                </div>
                <div className='spin ninth' style={styles.itemContainer}>
                    <div className="loading-item ninth" style={styles.circle} />
                </div>
            </div>
            <h3 style={styles.title}>Cargando...</h3>
        </div>
    </>);
}

export default LoadingSpinner;
