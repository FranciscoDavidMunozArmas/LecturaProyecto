import { Add } from '@material-ui/icons';
import React, { useState } from 'react';
import { BORDER_RADIOUS, palette } from '../libs/styles';

const styles = {
    container: {
        width: '90%',
        height: 'auto',
        margin: '10px 10px',
        padding: '10px 20px',
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: BORDER_RADIOUS,
    },
    borderBlack: {
        border:  `1px dashed ${palette.primary}`,
    },
    borderRed: {
        border: `1px dashed ${palette.secondary}`,
    }
}

function AddComponent() {
    const [borderStyle, setborderStyle] = useState<any>(styles.borderBlack);

  return (
      <div className='icon' style={{...borderStyle, ...styles.container}}
      onMouseEnter={() => setborderStyle(styles.borderRed)}
      onMouseLeave={() => setborderStyle(styles.borderBlack)}>
        <Add />
      </div>
  );
}

export default AddComponent;
