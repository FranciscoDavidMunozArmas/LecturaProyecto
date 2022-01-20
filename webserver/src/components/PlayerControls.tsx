import { ArrowBackIos, ArrowBackIosTwoTone, ArrowForward, ArrowForwardIos, ArrowForwardIosTwoTone, ChevronLeft, Pause, PlayArrow } from '@material-ui/icons';
import React, { useState } from 'react';
import { palette } from '../libs/styles';

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    padding: '0.5rem',
    maxWidth: "300px"
  },
  button: {
    width: "50px",
    height: "50px",
    display: 'flex',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    borderRadius: '100%',
    border: 'none',
    backgroundColor: palette.primary,
    color: palette.white,
    margin: '0.5rem 1rem',
    padding: 0,
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
      <button style={styles.button} onClick={handlePrevious}><ArrowBackIosTwoTone /></button>
      {
        (!playState)
          ? <button style={styles.button} onClick={handlePlay} ><PlayArrow /></button>
          : <button style={styles.button} onClick={handlePlay}><Pause /></button>
      }
      <button style={styles.button} onClick={handleNext}><ArrowForwardIosTwoTone style={{margin: 0}}/></button>
    </div>
  </>);
}

export default PlayerControls;
