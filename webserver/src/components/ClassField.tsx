import { Delete, DeleteForever, DeleteRounded, EditRounded, RemoveCircle } from '@material-ui/icons';
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
        flexDirection: 'row' as const,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: BORDER_RADIOUS,
    },
    text: {
        textAlign: 'center' as const,
        width: '100%',
        fontSize: text.paragraph.fontSize,
    },
}

interface Props {
    classCourse: CourseClass;
    onEdit?: () => void;
    onDelete?: () => void;
}

function ClassField(props: Props) {

    const onEdit = () => {
        props.onEdit?.();
    }

    const onDelete = () => {
        props.onDelete?.();
    }

    return (<>
        <div style={styles.container}>
            <h6 style={styles.text}>
                {props.classCourse.name}
            </h6>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div className="icon"
                    style={{ margin: '1rem' }}
                    onClick={() => onEdit()}>
                    <EditRounded />
                </div>
                <div className="icon"
                    style={{ margin: '1rem' }}
                    onClick={() => onDelete()}>
                    <DeleteRounded />
                </div>
            </div>
        </div>
    </>);
}

export default ClassField;
