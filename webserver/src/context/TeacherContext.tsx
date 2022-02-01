import React, { useEffect, useState } from 'react';
import { Teacher } from '../models/Teacher';

interface Props {
    children: any;
    teacher?: Teacher;
}

const TeacherContext = React.createContext<Teacher | null>(null);


function TeacherProvider(props: Props) {

    const [teacher, setTeacher] = useState<Teacher | null>(null);

    useEffect(() => {
        if (props.teacher) {
            setTeacher(props.teacher);
        }
        return () => { };
    }, [props.teacher]);

    return (
        <TeacherContext.Provider value={teacher}>
            {props.children}
        </TeacherContext.Provider>
    );
}

export { TeacherContext, TeacherProvider };
