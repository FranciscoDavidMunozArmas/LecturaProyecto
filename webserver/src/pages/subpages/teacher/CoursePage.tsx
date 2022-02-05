import { Delete, Edit } from '@material-ui/icons';
import { Backdrop, Fade, Modal, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AddComponent from '../../../components/AddComponent';
import BackButton from '../../../components/BackButton';
import ClassField from '../../../components/ClassField';
import CourseForm from '../../../components/CourseForm';
import LoadingSpinner from '../../../components/LoadingSpinner';
import Paragraph from '../../../components/Paragraph';
import Subtitle from '../../../components/Subtitle';
import Title from '../../../components/Title';
import TopicField from '../../../components/TopicField';
import TopicForm from '../../../components/TopicForm';
import { BORDER_RADIOUS, palette, text } from '../../../libs/styles';
import { toastManager } from '../../../libs/toastManager';
import { DELETE_BUTTON_NAME, DELETE_DATA_ERROR, EDIT_BUTTON_NAME, PATH_COURSE, PATH_PLAYCOURSE, REQUIERMENTS_NAME, SEND_DATA_ERROR, SUCCESS_MESSAGE } from '../../../libs/utils';
import { Course, courseConverter } from '../../../models/Course';
import { CourseClass } from '../../../models/CourseClass';
import { Topic, topicConverter } from '../../../models/Topic';
import { createTopic, deleteCourse, deleteCourseClass, deleteTopic, getCourse, updateCourse } from '../../../services/course.service';

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
  const [topics, settopics] = useState<Topic[]>([]);
  const [modalOpen, setmodalOpen] = useState<boolean>(false);
  const [courseModal, setcourseModal] = useState<boolean>(false);
  const [selectedTopic, setselectedTopic] = useState<Topic>();

  const [loadingContent, setloadingContent] = useState<boolean>(true);

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
    onCloseModal();
  }

  const onSubmitTopic = async (topic: any) => {
    const auxTopic = topicConverter.fromJSON(topic);
    try {
      if (course) {
        const data = await createTopic(course, auxTopic);
        settopics([...topics, topicConverter.fromJSON(data.data)]);
      }
    } catch (error: any) {
      console.log({
        errorCode: error.code,
        errorMessage: error.message,
      });
      toastManager.error(SEND_DATA_ERROR);
    }
    onCloseModal();
  }


  const onDeleteCourse = async () => {
    try {
      await deleteCourse(course?.id);
      toastManager.success(SUCCESS_MESSAGE);
      navigate(-1);
    } catch (error) {
      toastManager.error(DELETE_DATA_ERROR);
    }
  }

  const onDeleteTopic = async (topic: Topic) => {
    try {
      if (course) {
        await deleteTopic(course, topic);
        settopics(topics.filter(t => t.id !== topic.id));
      }
      toastManager.success(SUCCESS_MESSAGE);
    } catch (error) {
      toastManager.error(DELETE_DATA_ERROR);
    }
  }

  const onDeleteClassCourse = async (topic: Topic, courseClass: CourseClass) => {
    try {
      if (course) {
        const auxCourse = course;
        await deleteCourseClass(course, topic, courseClass);
        settopics(auxCourse.content.topics.map(t => {
          if (t.id === topic.id) {
            t.classes = t.classes.filter(c => c.id !== courseClass.id);
          }
          return t;
        }));
        toastManager.success(SUCCESS_MESSAGE);
      }
    } catch (error) {
      toastManager.error(DELETE_DATA_ERROR);
    }
  }

  useEffect(() => {
    setloadingContent(true);
    getData();
    setloadingContent(false);
  }, []);

  useEffect(() => {
    if (course) {
      settopics(course.content.topics);
    }
    return () => { }
  }, [course]);


  return (
    <>
      <div style={styles.container}>
        <BackButton />
        <div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <a className='icon'
              style={{ alignContent: 'center', ...styles.button }}
              onClick={() => onDeleteCourse()}>{DELETE_BUTTON_NAME} <Delete /></a>
            <a className='icon'
              style={{ alignContent: 'center', ...styles.button }}
              onClick={() => { setmodalOpen(true); setcourseModal(true) }}> <Edit /> {EDIT_BUTTON_NAME}</a>
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
        {(!loadingContent) ?
          <div style={styles.centerContent}>
            {
              topics.map((topic, index) => {
                return (
                  <div key={index} style={{ width: '90%', ...styles.centerContent }}>
                    <TopicField
                      onEdit={() => { setselectedTopic(topic); setmodalOpen(true); setcourseModal(false) }}
                      onDelete={() => onDeleteTopic(topic)}
                      topic={topic} />
                    <div key={index} style={{ width: '80%', ...styles.centerContent }}>
                      {
                        topic.classes.map((courseClass, index) => {
                          return (
                            <div key={index} style={{ width: '80%', ...styles.centerContent }}>
                              <ClassField
                                onEdit={() => onChangeView(topic, courseClass)}
                                onDelete={() => onDeleteClassCourse(topic, courseClass)}
                                classCourse={courseClass} />
                            </div>
                          )
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
          : <LoadingSpinner />}
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
              courseModal ? <CourseForm course={course} onSubmit={onSubmitCourse} /> : <TopicForm topic={selectedTopic} onSubmit={onSubmitTopic} />
            }
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default CoursePage;
