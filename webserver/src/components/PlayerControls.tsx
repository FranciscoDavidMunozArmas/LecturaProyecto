import { ArrowBackIos, ArrowForwardIos, Pause, PlayArrow } from '@material-ui/icons';
import React, { useState } from 'react';
import { palette } from '../libs/styles';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    padding: '0.5rem',
  },
  button: {
    borderRadius: '100%',
    border: 'none',
    backgroundColor: palette.primary,
    color: palette.white,
  },

}

interface Props {
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

function PlayerControls(props: Props) {

  const [playState, setplayState] = useState<boolean>(true);

  const handlePlay = () => {
    setplayState(!playState);
    playState ? props.onPause() : props.onPlay();
  }

  const handleNext = () => {
    props.onNext();
  }

  const handlePrevious = () => {
    props.onPrevious();
  }

  return (<>
    <div style={styles.container}>
      <button style={styles.button} onClick={handlePrevious}><ArrowBackIos /></button>
      {
        (!playState)
          ? <button style={styles.button} onClick={handlePlay} ><PlayArrow /></button>
          : <button style={styles.button} onClick={handlePlay}><Pause /></button>
      }
      <button style={styles.button} onClick={handleNext}><ArrowForwardIos /></button>
    </div>
  </>);
}

export default PlayerControls;
