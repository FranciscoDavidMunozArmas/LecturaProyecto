import { Course, courseConverter } from "./Course";
import { Student, studentConverter } from "./Student";

export class Certificate{
    id: string;
    course: string;
    student: string;
    date: Date;

    constructor(id: string, course: string, student: string, date: Date){
        this.id = id;
        this.course = course;
        this.student = student;
        this.date = date;
    }
}

export const certificateConverter = {
    toJSON: function (certificate: Certificate): any {
        return {
            id: certificate.id,
            course: certificate.course,
            student: certificate.student,
            date: certificate.date
        }
    },
    fromJSON: function (snapshot: any): Certificate {
        return new Certificate(
            snapshot.id,
            snapshot.course,
            snapshot.student,
            snapshot.date
        );
    }
}