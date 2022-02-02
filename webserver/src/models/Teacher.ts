import { Certificate, certificateConverter } from "./Certificate";
import { Course, courseConverter } from "./Course";

export class Teacher{
    name: string;
    surname: string;
    courses: Course[] = [];

    constructor(name: string, surname: string, courses: Course[]){
        this.name = name;
        this.surname = surname;
        this.courses = courses;
    }
}

export const teacherConverter = {
    toJSON: function (teacher: Teacher): any {
        return {
            name: teacher.name,
            surname: teacher.surname,
            courses: teacher.courses.map(courseConverter.toJSON)
        }
    },
    fromJSON: function (snapshot: any): Teacher {
        return new Teacher(
            snapshot.name,
            snapshot.surname,
            (snapshot.courses) ? snapshot.courses.map(courseConverter.fromJSON) : []
        );
    }
}