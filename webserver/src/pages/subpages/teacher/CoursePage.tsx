import { Delete, Edit } from '@material-ui/icons';
import { Backdrop, Fade, Modal, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AddComponent from '../../../components/AddComponent';
import BackButton from '../../../components/BackButton';
import CourseForm from '../../../components/CourseForm';
import Paragraph from '../../../components/Paragraph';
import Subtitle from '../../../components/Subtitle';
import Title from '../../../components/Title';
import TopicField from '../../../components/TopicField';
import TopicForm from '../../../components/TopicForm';
import { BORDER_RADIOUS, palette, text } from '../../../libs/styles';
import { toastManager } from '../../../libs/toastManager';
import { DELETE_BUTTON_NAME, EDIT_BUTTON_NAME, PATH_COURSE, PATH_PLAYCOURSE, REQUIERMENTS_NAME, SEND_DATA_ERROR } from '../../../libs/utils';
import { Course, courseConverter } from '../../../models/Course';
import { CourseClass } from '../../../models/CourseClass';
import { Topic, topicConverter } from '../../../models/Topic';
import { createTopic, getCourse, updateCourse } from '../../../services/course.service';

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
  button: {
    fontSize: text.paragraph.fontSize
  },
  centerContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10px',
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
  const [courseModal, setcourseModal] = useState<boolean>(false);

  const location: any = useLocation();
  const navigate = useNavigate();

  const onCloseModal = () => {
    setmodalOpen(false);
    setcourseModal(false);
  }

  const getData = async () => {
    try {
      const response = await getCourse(location.state.course.id);
      setcourse(courseConverter.fromJSON(response.data));
    } catch (error: any) {
      console.log(error);
      setcourse(location.state.course);
    }
  }

  const onChangeView = (topic: Topic, courseClass?: CourseClass) => {
    navigate(`../${PATH_COURSE}/${PATH_PLAYCOURSE}`, { state: { course: course, topic: topic, courseClass: courseClass } });
  }

  const onSubmitCourse = async (data: any) => {
    if (data && course) {
      const auxCourse = course;
      auxCourse.name = data.name;
      auxCourse.content.description = data.content.description;
      auxCourse.content.requirements = data.content.requirements;

      try {
        await updateCourse(courseConverter.toJSON(auxCourse));
        setcourse(auxCourse);
      } catch (error: any) {
        toastManager.error(SEND_DATA_ERROR);
      }
    }
    console.log(course);
    onCloseModal();
  }

  const onSubmitTopic = async (topic: any) => {
    const auxTopic = topicConverter.fromJSON(topic);
    try {
      if (course) {
        const data = await createTopic(course, auxTopic);
        course.content.topics.push(topicConverter.fromJSON(data.data));
      }
    } catch (error) {
      toastManager.error(SEND_DATA_ERROR);
    }
    onCloseModal();
  }

  useEffect(() => {
    setcourse(courseConverter.fromJSON(location.state.course));
    getData();
    return () => { }
  }, []);


  return (
    <>
      <div style={styles.container}>
        <BackButton />
        <div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <a className='icon' style={{ alignContent: 'center', ...styles.button }}>{DELETE_BUTTON_NAME} <Delete /></a>
            <a className='icon' style={{ alignContent: 'center', ...styles.button }} onClick={() => { setmodalOpen(true); setcourseModal(true) }}> <Edit /> {EDIT_BUTTON_NAME}</a>
          </div>
          <Title title={(course) ? course.name : "Course"} />
          <Paragraph text={(course) ? course.content.description : "Course"} />
          <Subtitle text={REQUIERMENTS_NAME} />
          {
            (course) ? course.content.requirements.map((objective, index) => {
              return <Paragraph key={index} text={objective} style={{ marginLeft: '2rem' }} />
            }) : null
          }
        </div>
        <div style={styles.centerContent}>
          {
            course && course.content.topics.map((topic, index) => {
              return (
                <div key={index} style={{ width: '90%', ...styles.centerContent }}>
                  <TopicField topic={topic} />
                  <div key={index} style={{ width: '80%', ...styles.centerContent }}>
                    {
                      topic.classes.map((courseClass, index) => {
                        return <div>{courseClass.name}</div>
                      })
                    }
                    <AddComponent onClick={() => onChangeView(topic)} />
                  </div>
                </div>
              )
            })
          }
          <AddComponent onClick={() => { setmodalOpen(true) }} />
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
            {
              courseModal ? <CourseForm course={course} onSubmit={onSubmitCourse} /> : <TopicForm onSubmit={onSubmitTopic} />
            }
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default CoursePage;
