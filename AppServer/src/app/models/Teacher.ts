import { Certificate, certificateConverter } from "./Certificate";
import { Course, courseConverter } from "./Course";

export class Teacher{
    name: string;
    surname: string;
    courses: string[] = [];

    constructor(name: string, surname: string, courses: string[]){
        this.name = name;
        this.surname = surname;
        this.courses = (courses) ? courses : [];
    }
}

export const teacherConverter = {
    toJSON: function (teacher: Teacher): any {
        return {
            name: teacher.name,
            surname: teacher.surname,
            courses: teacher.courses
        }
    },
    fromJSON: function (snapshot: any): Teacher {
        return new Teacher(
            snapshot.name,
            snapshot.surname,
            snapshot.courses
        );
    }
}