import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpeechSynthesis } from "react-speech-kit";
import { Add, Remove } from '@material-ui/icons';
import Modal from '@mui/material/Modal';
import CourseCard from '../../../components/CourseCard';
import LoadingSpinner from '../../../components/LoadingSpinner';
import MoreButton from '../../../components/MoreButton';
import Subtitle from '../../../components/Subtitle';
import Title from '../../../components/Title';
import { TeacherContext } from '../../../context/TeacherContext';
import { toastManager } from '../../../libs/toastManager';
import { GETTING_DATA_ERROR, HINT_COURSE_NAME, HINT_COURSE_REQUIREMENT, HOME_NAME, REQUIERMENTS_NAME, SUBSECTION_COURSES, SUBSECTION_HOME_1_NAME, VOICE_ES } from '../../../libs/utils';
import { Course } from '../../../models/Course';
import { Teacher } from '../../../models/Teacher';
import { getCoursesMany } from '../../../services/course.service';
import { Backdrop, Box, Fade, Typography } from '@mui/material';
import InputText from '../../../components/InputText';
import CourseForm from '../../../components/CourseForm';

const styles = {
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column' as const,
    overflowY: 'auto' as const,
  },
  moreContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'end',
  },
  moreButton: {
    fontSize: '1rem',
    fontStyle: 'italic',
    margin: '10px 15px',
  },
  modalContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
  }
}

function Home() {

  const [loadingCourses, setloadingCourses] = useState<boolean>(false);
  const [courses, setcourses] = useState<Course[]>([]);
  const [modalOpen, setmodalOpen] = useState<boolean>(false);

  const teacher = useContext(TeacherContext);
  const navigate = useNavigate();
  const { speak, cancel } = useSpeechSynthesis();

  const courseCard = (data: Course[]) => {
    return data.map((course: Course, index: any) => {
      return (
        <div key={index}>
          <CourseCard course={course} onClick={() => onClick(course)} />
        </div>
      )
    });
  }

  const onSpeak = (text: string) => {
    speak({ text: text, voice: VOICE_ES });
  }

  const onClick = (course: Course) => {
    // const saved = !!student?.courses.find(c => c.courseID === course.id);
    // navigate(`../${PATH_COURSE}`, { state: { course: course, saved: saved, student: student } });
  }

  const onCloseModal = () => {
    setmodalOpen(false);
  }

  const getData = async (teacher: Teacher) => {
    try {
      setcourses(teacher.courses);
    } catch (error: any) {
      toastManager.error(GETTING_DATA_ERROR);
      onSpeak(GETTING_DATA_ERROR);
    }
  }

  useEffect(() => {
    setloadingCourses(true);
    if (teacher) {
      getData(teacher);
    }
    setloadingCourses(false);
    return () => { };
  }, [teacher]);


  return (
    <>
      <div style={styles.container}>
        <Title title={HOME_NAME} />
        <div>
          <MoreButton overrideText='Crear Curso' onClick={() => setmodalOpen(true)} />
          <Subtitle text={SUBSECTION_COURSES} />
          {
            loadingCourses ?
              <LoadingSpinner />
              :
              <>
                {
                  courseCard(courses)
                }
              </>
          }
        </div>
      </div>
      <Modal
        open={modalOpen}
        onClose={() => onCloseModal()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={modalOpen}>
          <Box sx={styles.modalContainer}>
            <div style={{ position: 'relative', width: "100%", height: "100%" }}>
              <CourseForm />
            </div>
          </Box>
        </Fade>
      </Modal>
    </>

  );
}

export default Home;
