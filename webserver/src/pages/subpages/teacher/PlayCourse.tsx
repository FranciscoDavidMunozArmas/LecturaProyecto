import React, { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from '../../../components/BackButton';
import InputFile from '../../../components/InputFile';
import InputText from '../../../components/InputText';
import PlayerControls from '../../../components/PlayerControls';
import Trackbar from '../../../components/Trackbar';
import { BORDER_RADIOUS, palette, text } from '../../../libs/styles';
import { toastManager } from '../../../libs/toastManager';
import { AUDIO_ERROR, AUDIO_URI, GETTING_DATA_ERROR, HINT_CLASS_NAME, HINT_SELECT_AUDIO, SAVE_BUTTON_NAME, SEND_DATA_ERROR } from '../../../libs/utils';
import { Course } from '../../../models/Course';
import { courseClassConverter } from '../../../models/CourseClass';
import { Topic } from '../../../models/Topic';
import { addCourseClass } from '../../../services/course.service';

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    position: 'relative' as const
  },
  hintText: {
    fontSize: text.paragraph.fontSize,
    lineHeight: text.paragraph.lineHeight,
    fontStyle: text.paragraph.fontStyle,
    textAlign: 'center' as const,
  },
  submitButton: {
    margin: '10px',
    padding: '10px',
    border: 'none',
    borderRadius: BORDER_RADIOUS,
    backgroundColor: palette.white,
    fontSize: text.subtitle.fontSize,
  }
}

function PlayCourse() {

  const [name, setname] = useState<string>("");
  const [audioName, setaudioName] = useState<string>(HINT_SELECT_AUDIO);
  const [playState, setplayState] = useState<boolean>(false);
  const [enable, setenable] = useState<boolean>(false);
  const [stop, setstop] = useState<boolean>(false);
  const [file, setfile] = useState<File>();
  const [course, setcourse] = useState<Course>();
  const [topic, settopic] = useState<Topic>();

  const location: any = useLocation();
  const navigate = useNavigate();

  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const intervalRef = useRef<NodeJS.Timeout>(0 as any);

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setname(event.target.value);
  }

  const onFileChange = (file: File) => {
    if (file) {
      setfile(file);
      setaudioName(file.name);
      setenable(true);
      audioRef.current = new Audio(URL.createObjectURL(file));
    }
  }

  const onPause = () => {
    setplayState(false);
  }

  const onPlay = () => {
    setplayState(true);
  }

  const onStop = () => {
    setplayState(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (course && topic && file) {
        const courseClass = courseClassConverter.fromJSON({ name: name });
        await addCourseClass(course, topic, courseClass, file);
        navigate(-1);
      } else {
        toastManager.error(SEND_DATA_ERROR);
      }
    } catch (error: any) {
      toastManager.error(SEND_DATA_ERROR);
    }
  }

  const handleError = () => {
    audioRef.current?.pause();
    toastManager.error(AUDIO_ERROR);
  }

  useEffect(() => {
    setcourse(location.state.course);
    settopic(location.state.topic);
    if (location.state.courseClass) {
      setname(location.state.courseClass.name);
      setaudioName(location.state.courseClass.file);
      audioRef.current = new Audio(`${AUDIO_URI}${location.state.courseClass.file}`);
      setenable(true);
    }
    return () => { };
  }, []);

  useEffect(() => {
    if (playState) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    return () => { };
  }, [playState]);

  return (
    <div style={styles.container}>
      <BackButton onClick={() => setstop(true)} />
      <form
        style={styles.container}
        onSubmit={onSubmit}>
        <InputText hint={HINT_CLASS_NAME}
          name="name"
          value={name}
          required={true}
          onChange={onNameChange} />
        <InputFile hint={HINT_SELECT_AUDIO}
          onChange={onFileChange}
          required={true} />
        <h1 style={styles.hintText}>{audioName}</h1>
        <PlayerControls
          status={playState}
          enable={!file}
          noNext={true}
          noPrevious={true}
          onPlay={onPlay}
          onPause={onPause} />
        <button type='submit' className='icon' style={styles.submitButton}>{SAVE_BUTTON_NAME}</button>
      </form>
      <audio ref={audioRef} onError={handleError} />
    </div>
  );
}

export default PlayCourse;
