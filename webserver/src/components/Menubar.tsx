import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSpeechSynthesis } from "react-speech-kit";
import { signOut } from '../auth/auth';
import { toastManager } from '../libs/toastManager';
import { removeToken } from '../libs/tokenInterceptor';
import { SIGN_OUT_ERROR, VOICE_EN, VOICE_ES } from '../libs/utils';

const styles = {
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column' as const,
        position: 'relative' as const,
        backgroundColor: '#fff'
    },
    menuTitle: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#000',
        margin: '0.75rem 0.5rem',
        textDecoration: 'none'
    },
    menuItem: {
        fontSize: '1.2rem',
        color: '#000',
        fontWeight: 'bold',
        fontStyle: 'italic',
        margin: '0.75rem 1.5rem',
        textDecoration: 'none'
    },
    menuSubItem: {
        fontSize: '1.2rem',
        color: '#000',
        fontStyle: 'italic',
        margin: '0.75rem 2.5rem',
        textDecoration: 'none'
    },
    signOutContainer: {
        position: 'absolute' as const,
        bottom: '0',
        width: "100%",
        display: "flex",
        flexDirection: "row" as const,
        justifyContent: "center",
        alignItems: "center",
    },
    signOut: {
        fontSize: '1.2rem',
        color: '#000',
        fontWeight: 'bold',
        fontStyle: 'italic',
        border: "none",
        backgroundColor: 'transparent',
    }
}

interface Props {
    children?: [{
        text: string,
        path: string,
        children?: [{
            text: string,
        }]
    }]
}

function Menubar(props: Props) {

    const { speak, cancel } = useSpeechSynthesis();
    const navigate = useNavigate();

    const mainPath = () => {
        return props.children?.map((element: any, key: any) => {
            return (
                <div key={key}>
                    <NavLink to={element.path} style={styles.menuItem} onMouseEnter={() => onSpeak(element.text)} onMouseLeave={() => cancel()}>
                        {element.text}
                    </NavLink>
                    {innerChildren(element.children)}
                </div>
            )
        })
    }

    const innerChildren = (children: any) => {
        return children?.map((element: any, key: any) => {
            return (
                <div key={key} style={styles.menuSubItem}  onMouseEnter={() => onSpeak(element.text)} onMouseLeave={() => cancel()}>
                    {element.text}
                </div>
            )
        })
    }

    const onSpeak = (text: string) => {
        speak({ text: text, voice: VOICE_ES });
    }

    const onSignOut = async () => {
        const response = await signOut();
        if(response) {
            removeToken();
            navigate("/login");
        } else {
            toastManager.error(SIGN_OUT_ERROR);
            onSpeak(SIGN_OUT_ERROR);
        }
    }

    return (
        <>
            <div style={styles.container}>
                <div  onMouseEnter={() => onSpeak("MEN??")} onMouseLeave={() => cancel()}>
                    <h1 style={styles.menuTitle}>MEN??</h1>
                </div>
                {mainPath()}

                <div style={styles.signOutContainer}>
                    <a style={styles.signOut} onClick={onSignOut} onMouseEnter={() => onSpeak("CERRAR SESION")} onMouseLeave={() => cancel()}>CERRAR SESION</a>
                </div>
            </div>
        </>
    )
}

export default Menubar
