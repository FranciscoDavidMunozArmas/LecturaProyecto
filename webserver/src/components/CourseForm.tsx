import { Add, Remove } from '@material-ui/icons';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { BORDER_RADIOUS, palette, text } from '../libs/styles';
import { CERTIFICATE_NAME, HINT_COURSE_DESCRIPTION, HINT_COURSE_NAME, HINT_COURSE_REQUIREMENT, REQUIERMENTS_NAME, SAVE_NAME } from '../libs/utils';
import { Course, courseConverter } from '../models/Course';
import InputText from './InputText';
import Subtitle from './Subtitle';

const styles = {
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
    },
    submitButton: {
        margin : '10px',
        padding: '10px',
        border: 'none',
        borderRadius: BORDER_RADIOUS,
        backgroundColor: palette.white,
        fontSize: text.subtitle.fontSize,
    }
}

interface Props {
    course?: Course,
    onSubmit?: (course: any) => void;
}

function CourseForm(props: Props) {
    const [course, setcourse] = useState<Course>();
    const [requirements, setrequirements] = useState<string[]>([""]);
    const [data, setdata] = useState<any>({});

    const onAddRequirement = () => {
        setrequirements([...requirements, ""]);
    }

    const onRemoveRequirement = (index: number) => {
        setrequirements(requirements.filter((requirement, i) => i !== index));
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setdata({ ...data, [event.target.name]: event.target.value });
    }

    const onRequirementChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        setrequirements(requirements.map((requirement, i) => (i === index) ? event.target.value : requirement));
    }

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const content = {
            description: data.description,
            requirements: requirements.filter(requirement => requirement !== ""),
        }
        const course = {
            name: data.name,
            content
        };
        props.onSubmit?.(course);
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
            <form style={styles.form} onSubmit={onSubmit}>
                <InputText
                    hint={HINT_COURSE_NAME}
                    onChange={onChange}
                    name="name"
                    value={(props.course) ? props.course.name : ""}
                    required={true} />
                <InputText
                    hint={HINT_COURSE_DESCRIPTION}
                    onChange={onChange}
                    name="description" value={(props.course) ? props.course.content.description : ""}
                    required={true} />
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
                                        onChange={(event) => onRequirementChange(event, index)}
                                        required={true} />
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
                <div>
                    <button type='submit' className='icon' style={styles.submitButton}>{SAVE_NAME}</button>
                </div>
            </form>
        </div>
    );
}

export default CourseForm;
