import { MusicNote } from '@material-ui/icons';
import { height } from '@mui/system';
import React from 'react';
import { BORDER_RADIOUS, palette } from '../libs/styles';

const styles = {
    container: {
        width: "100%",
        display: 'flex',
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
    },
    iconContainer: {
        width: '250px',
        height: '250px',
        display: 'flex',
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        borderRadius: BORDER_RADIOUS,
        backgroundColor: palette.primary,
        color: palette.white,
    },
    icon: {
        width: '150px',
        height: '150px'
    }
}

function PlayerDetails() {
    return (<>
        <div style={styles.container}>
            <div style={styles.iconContainer}>
                <MusicNote style={styles.icon} />
            </div>
        </div>
    </>);
}

export default PlayerDetails;
