import { Add, Remove } from '@material-ui/icons';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { HINT_COURSE_DESCRIPTION, HINT_COURSE_NAME, HINT_COURSE_REQUIREMENT, REQUIERMENTS_NAME } from '../libs/utils';
import { Course } from '../models/Course';
import InputText from './InputText';
import Subtitle from './Subtitle';

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
    },
}

interface Props {
    course?: Course,
    onSubmit?: (course: any) => void;
}

function CourseForm(props: Props) {
    const [course, setcourse] = useState<Course>();
    const [requirements, setrequirements] = useState<string[]>([""]);

    const onAddRequirement = () => {
        setrequirements([...requirements, ""]);
    }

    const onRemoveRequirement = (index: number) => {
        setrequirements(requirements.filter((requirement, i) => i !== index));
    }

    const onRequirementChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        setrequirements(requirements.map((requirement, i) => (i === index) ? event.target.value : requirement));
    }

    useEffect(() => {
        if (props.course) {
            setcourse(props.course);
            setrequirements(props.course.content.requirements);
        }
        return () => { };
    }, [props.course]);


    return (
        <div>
            <form style={styles.form}>
                <InputText hint={HINT_COURSE_NAME} value={(props.course) ? props.course.name : ""} />
                <InputText hint={HINT_COURSE_DESCRIPTION} value={(props.course) ? props.course.content.description : ""} />
                <Subtitle text={REQUIERMENTS_NAME} />
                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {
                        requirements.map((requirement, index) => {
                            return (
                                <div
                                    style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                                    key={index}>
                                    <InputText
                                        hint={HINT_COURSE_REQUIREMENT}
                                        value={requirement}
                                        onChange={(event) => onRequirementChange(event, index)} />
                                    {(requirements.length - 1 === index) ?
                                        <div className='icon'
                                            style={{ margin: '10px', cursor: 'pointer' }}
                                            onClick={() => onAddRequirement()}>
                                            <Add />
                                        </div> : (requirements.length <= 1) ? null :
                                            <div className='icon'
                                                style={{ margin: '10px', cursor: 'pointer' }}
                                                onClick={() => onRemoveRequirement(index)}>
                                                <Remove />
                                            </div>}

                                </div>
                            );
                        })
                    }
                </div>
            </form>
        </div>
    );
}

export default CourseForm;
