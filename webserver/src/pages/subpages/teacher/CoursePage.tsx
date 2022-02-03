import { Backdrop, Fade, Modal, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AddComponent from '../../../components/AddComponent';
import BackButton from '../../../components/BackButton';
import CourseForm from '../../../components/CourseForm';
import Paragraph from '../../../components/Paragraph';
import Subtitle from '../../../components/Subtitle';
import Title from '../../../components/Title';
import { BORDER_RADIOUS, palette, text } from '../../../libs/styles';
import { EDIT_NAME, REQUIERMENTS_NAME } from '../../../libs/utils';
import { Course } from '../../../models/Course';

const styles = {
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column' as const,
    overflowY: 'auto' as const,
  },
  topicHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row' as const,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  topicTime: {
    width: 'auto',
    fontSize: '1rem',
    fontStyle: "italic",
  },
  editButton: {
    position: 'absolute' as const,
    right: 0,
    fontSize: text.paragraph.fontSize
  },
  modalContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: palette.white,
    border: 'none',
    boxShadow: 24,
    padding: 4,
    borderRadius: BORDER_RADIOUS,
  }
}

function CoursePage() {

  const [course, setcourse] = useState<Course>();
  const [modalOpen, setmodalOpen] = useState<boolean>(false);

  const location: any = useLocation();
  const navigate = useNavigate();

  const onCloseModal = () => {
    setmodalOpen(false);
  }

  useEffect(() => {
    setcourse(location.state.course);
    return () => { }
  }, []);


  return (
    <>
      <div style={styles.container}>
        <BackButton />
        <div  style={{ position: 'relative' }}>
          <a className='icon' style={styles.editButton} onClick={() => setmodalOpen(true)}>{EDIT_NAME}</a>
          <Title title={(course) ? course.name : "Course"} />
          <Paragraph text={(course) ? course.content.description : "Course"} />
          <Subtitle text={REQUIERMENTS_NAME} />
          {
            (course) ? course.content.requirements.map((objective, index) => {
              return <Paragraph key={index} text={objective} style={{ marginLeft: '2rem' }} />
            }) : null
          }
        </div>

        <AddComponent />
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
            <CourseForm course={course} />
          </Box>
        </Fade>

      </Modal>
    </>
  );
}

export default CoursePage;
