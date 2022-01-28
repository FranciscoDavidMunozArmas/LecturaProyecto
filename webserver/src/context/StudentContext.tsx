import React, { createContext, useEffect, useState } from 'react';
import { Student } from '../models/Student';

interface Props {
    children: any;
    student?: Student;
}

const StudentContext = createContext<Student | null>(null);

function StudentProvider(props: Props) {

    const [student, setStudent] = useState<Student | null>(null);

    useEffect(() => {
        if (props.student) {
            setStudent(props.student);
        }
        return () => { };
    }, [props.student]);


    return (
        <StudentContext.Provider value={student}>
            {props.children}
        </StudentContext.Provider>);
}

export { StudentContext, StudentProvider };


