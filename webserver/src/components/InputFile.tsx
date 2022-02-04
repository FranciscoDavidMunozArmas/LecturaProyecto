import { MusicNote } from '@material-ui/icons';
import { style } from '@mui/system';
import React, { useRef, useState } from 'react';
import { BORDER_RADIOUS, palette } from '../libs/styles';

const styles = {
    container: {
        width: '450px',
        height: '450px',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        margin: '10px auto',
        cursor: 'pointer',
        borderRadius: BORDER_RADIOUS,
    },
    borderBlack: {
        border: `2px dashed ${palette.primary}`,
        transition: 'border-color 0.2s ease-in-out',
    },
    borderRed: {
        border: `2px dashed ${palette.secondary}`,
        transition: 'border-color 0.2s ease-in-out',
    },
    backgroundRed: {
        backgroundColor: palette.secondary,
        transition: 'background-color 0.2s ease-in-out',
    },
    backgroundBlack: {
        backgroundColor: palette.primary,
        transition: 'background-color 0.2s ease-in-out',
    },
    iconContainer: {
        width: '250px',
        height: '250px',
        display: 'flex',
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        borderRadius: BORDER_RADIOUS,
        color: palette.white,
    },
    icon: {
        width: '150px',
        height: '150px'
    },
    disable: {
        display: 'none',
    }
}

interface Props {
    name?: string;
    value?: string,
    ref?: any,
    type?: string | undefined,
    required?: boolean,
    hint: string,
    onChange: (file: File) => void;
}

function InputFile(props: Props) {

    const [borderStyle, setborderStyle] = useState<any>(styles.borderBlack);
    const [backgroundColor, setbackgroundColor] = useState<any>(styles.backgroundBlack);

    const inputFile = useRef<HTMLInputElement | null>(null);

    const onChange = (event: HTMLInputElement) => {
        if (event.files && event.files[0]) {
            props.onChange(event.files[0]);
        }
    };

    const onClick = () => {
        if (inputFile.current) {
            inputFile.current.click();
        }
    }

    return (
        <>
            <div className='icon'
                style={{ ...styles.container, ...borderStyle }}
                onMouseEnter={() => { setborderStyle(styles.borderRed); setbackgroundColor(styles.backgroundRed) }}
                onMouseLeave={() => { setborderStyle(styles.borderBlack); setbackgroundColor(styles.backgroundBlack) }}
                onClick={onClick}>
                <div className='icon' style={{ ...backgroundColor, ...styles.iconContainer }}>
                    <MusicNote style={styles.icon} />
                </div>
            </div>
            <input type="file"
                name={(props.name) ? props.name : "file"}
                onChange={() => onChange(inputFile.current as HTMLInputElement)}
                ref={inputFile}
                required={!!props.ref}
                style={styles.disable} />
        </>
    );
}

export default InputFile;
