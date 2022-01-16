import React from 'react'
import { NavLink } from 'react-router-dom'

const styles = {
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column' as const,
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
        margin: '0.75rem 1.25rem',
        textDecoration: 'none'
    },
    menuSubItem: {
        fontSize: '1.2rem',
        color: '#000',
        fontStyle: 'italic',
        margin: '0.75rem 2rem',
        textDecoration: 'none'
    },
}

interface Props {
    children?: [{
        text: string,
        path: string,
        children?: [{
            text: string,
        }]
    }],
    signout?: () => void
}

function Menubar(props: Props) {

    const mainPath = () => {
        return props.children?.map((element: any, key: any) => {
            return (
                <div key={key}>
                    <NavLink to={element.path} style={styles.menuItem}>
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
                <div key={key} style={styles.menuSubItem}>
                    {element.text}
                </div>
            )
        })
    }


    return (
        <>
            <div style={styles.container}>
                <div>
                    <h1 style={styles.menuTitle}>MENU</h1>
                </div>
                {mainPath()}
            </div>
        </>
    )
}

export default Menubar
