import React from 'react';
import { BORDER_RADIOUS } from '../libs/styles';
import { Topic } from '../models/Topic';
import AddComponent from './AddComponent';

const styles = {
    container: {
        width: '100%',
        height: 'auto',
        margin: '10px 10px',
        padding: '10px 20px',
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: BORDER_RADIOUS,
    },
}

interface Props {
    topic: Topic
}

function TopicField(props: Props) {
    return (<>
        <div style={styles.container}>
            <h1>
                {props.topic.name}
            </h1>
        </div>
    </>);
}

export default TopicField;
