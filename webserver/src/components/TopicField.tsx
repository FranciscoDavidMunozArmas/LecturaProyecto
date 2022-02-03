import React from 'react';
import { BORDER_RADIOUS, text } from '../libs/styles';
import { Topic } from '../models/Topic';
import AddComponent from './AddComponent';

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
    topic: Topic
}

function TopicField(props: Props) {
    return (<>
        <div style={styles.container}>
            <h6 style={styles.text}>
                {props.topic.name}
            </h6>
        </div>
    </>);
}

export default TopicField;
