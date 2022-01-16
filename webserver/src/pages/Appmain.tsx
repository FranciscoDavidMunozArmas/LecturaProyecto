import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { checkToken } from '../libs/tokenInterceptor';

function Appmain() {

    const navigate = useNavigate();

    useEffect(() => {
        if(!checkToken()) {
            navigate("/login");
        }
        return () => {}
    }, [])

    return (
        <div>
            Main
        </div>
    )
}

export default Appmain
