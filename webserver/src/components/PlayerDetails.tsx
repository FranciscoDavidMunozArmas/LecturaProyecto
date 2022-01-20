import { MusicNote } from '@material-ui/icons';
import { height } from '@mui/system';
import React from 'react';
import { BORDER_RADIOUS, palette } from '../libs/styles';

const styles = {
    container: {
        width: "100%"
    },
    icon: {
        width: '100px',
        height: '100px',
        borderRadius: BORDER_RADIOUS,
        backgroundColor: palette.primary,
        color: palette.white
    }
}

function PlayerDetails() {
  return (<>
  <div style={styles.container}>
      <MusicNote />
  </div>
  </>);
}

export default PlayerDetails;
