import { Course, courseConverter } from "./Course";
import { Student, studentConverter } from "./Student";

export class Certificate{
    id: string;
    course: Course;
    student: Student;
    date: Date;
    owner: string;

    constructor(id: string, course: Course, student: Student, date: Date, owner: string){
        this.id = id;
        this.course = course;
        this.student = student;
        this.date = date;
        this.owner = owner;
    }
}

export const certificateConverter = {
    toJSON: function (certificate: Certificate): any {
        return {
            id: certificate.id,
            course: courseConverter.toJSON(certificate.course),
            student: studentConverter.toJSON(certificate.student),
            date: certificate.date,
            owner: certificate.owner
        }
    },
    fromJSON: function (snapshot: any): Certificate {
        return new Certificate(
            snapshot.id,
            snapshot.course,
            snapshot.student,
            snapshot.date,
            snapshot.owner
        );
    }
}