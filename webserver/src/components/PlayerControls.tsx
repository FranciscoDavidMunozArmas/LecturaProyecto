import React, { useEffect, useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { ArrowBackIos, ArrowBackIosTwoTone, ArrowForward, ArrowForwardIos, ArrowForwardIosTwoTone, ChevronLeft, Pause, PlayArrow } from '@material-ui/icons';
import { palette } from '../libs/styles';
import { NEXT_NAME, PAUSE_NAME, PLAY_NAME, PREVIOURS_NAME, VOICE_ES } from '../libs/utils';

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
  buttonDisabled: {
    opacity: '0.5',
  },
  buttonEnabled: {
    opacity: '1',
  }

}

interface Props {
  status: boolean;
  enable?: boolean;
  showPrevious?: boolean;
  showNext?: boolean;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

function PlayerControls(props: Props) {

  const [playState, setplayState] = useState<boolean>(true);
  const [disable, setdisable] = useState<any>(styles.buttonEnabled);

  const { speak, cancel } = useSpeechSynthesis();

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

  const onSpeak = (text: string) => {
    speak({ text, voice: VOICE_ES });
  }

  useEffect(() => {
    setplayState(!!props.status);
    return () => { };
  }, [props.status]);

  useEffect(() => {
    setdisable(!props.enable ? styles.buttonEnabled : styles.buttonDisabled);
    return () => { };
  }, [props.enable]);

  return (<>
    <div style={styles.container}>
      {!props.showPrevious && <button style={{ ...disable, ...styles.button }} onClick={handlePrevious} onMouseEnter={() => onSpeak(PREVIOURS_NAME)} onMouseDown={() => cancel()}><ArrowBackIosTwoTone /></button>}
      {
        (!playState)
          ? <button style={{ ...disable, ...styles.button }} onClick={handlePlay} onMouseEnter={() => onSpeak(PLAY_NAME)} onMouseDown={() => cancel()}><PlayArrow /></button>
          : <button style={{ ...disable, ...styles.button }} onClick={handlePlay} onMouseEnter={() => onSpeak(PAUSE_NAME)} onMouseDown={() => cancel()}><Pause /></button>
      }
      {!props.showNext && <button style={{ ...disable, ...styles.button }} onClick={handleNext} onMouseEnter={() => onSpeak(NEXT_NAME)} onMouseDown={() => cancel()}><ArrowForwardIosTwoTone style={{ margin: 0 }} /></button>}
    </div>
  </>);
}

export default PlayerControls;
