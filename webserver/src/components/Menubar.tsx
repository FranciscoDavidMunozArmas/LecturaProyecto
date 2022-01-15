import React from 'react'
import { NavLink } from 'react-router-dom'

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
                    <NavLink to={element.path}>
                        <h2>{element.text}</h2>
                    </NavLink>
                    {innerChildren(element.children)}
                </div>
            )
        })
    }

    const innerChildren = (children: any) => {
        return children?.map((element: any, key: any) => {
            return (
                <div key={key}>
                    <h3>{element.text}</h3>
                </div>
            )
        })
    }


    return (
        <>
            <div className="flex flex-row justify-content-between h-full">
                <div>
                    <h1>MENU</h1>
                </div>
                {mainPath()}
            </div>
        </>
    )
}

export default Menubar
