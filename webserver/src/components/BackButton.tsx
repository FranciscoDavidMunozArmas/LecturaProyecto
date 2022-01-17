import { ChevronLeft } from '@material-ui/icons';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BACK_NAME } from '../libs/utils';

const styles = {
    backContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'end',
    },
    backButton: {
        display: 'flex',
        fontSize: '1rem',
        fontStyle: 'italic',
        margin: '10px 15px',
        alignItems: 'center',
    },
}

function BackButton() {

    const navigate = useNavigate();

    const onBack = () => {
        navigate(-1);
    }

    return (
        <div style={styles.backContainer}>
            <a style={styles.backButton} onClick={() => onBack()}><ChevronLeft /> {BACK_NAME}</a>
        </div>
    )
}

export default BackButton
