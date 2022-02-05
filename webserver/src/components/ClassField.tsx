import React from 'react';
import { BORDER_RADIOUS, text } from '../libs/styles';
import { CourseClass } from '../models/CourseClass';

const styles = {
    container: {
        width: '100%',
        height: 'auto',
        margin: '5px 10px',
        padding: '10px 20px',
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: BORDER_RADIOUS,
    },
    text: {
        textAlign: 'start' as const,
        width: '100%',
        fontSize: text.subtitle.fontSize,
    },
}

interface Props {
    classCourse: CourseClass;
}

function ClassField(props: Props) {
    return (<>
        <div style={styles.container}>
            <h6 style={styles.text}>
                {props.classCourse.name}
            </h6>
        </div>
    </>);
}

export default ClassField;
