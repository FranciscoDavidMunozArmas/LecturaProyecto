import { Certificate, certificateConverter } from "./Certificate";
import { Course, courseConverter } from "./Course";

export class Teacher{
    name: string;
    surname: string;

    constructor(name: string, surname: string ) {
        this.name = name;
        this.surname = surname;
    }
}

export const teacherConverter = {
    toJSON: function (teacher: Teacher) {
        return {
            name: teacher.name,
            surname: teacher.surname,
        }
    },
    fromJSON: function (snapshot: any): Teacher {
        return new Teacher(
            snapshot.name,
            snapshot.surname,
        );
    }
}