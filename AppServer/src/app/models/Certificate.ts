import { Course, courseConverter } from "./Course";
import { Student, studentConverter } from "./Student";

export class Certificate{
    id: string;
    course: Course;
    student: Student;
    date: Date;

    constructor(id: string, course: Course, student: Student, date: Date){
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
            course: courseConverter.toJSON(certificate.course),
            student: studentConverter.toJSON(certificate.student),
            date: certificate.date
        }
    },
    fromJSON: function (snapshot: any): Certificate {
        return new Certificate(
            snapshot.id,
            courseConverter.fromJSON(snapshot.course),
            studentConverter.fromJSON(snapshot.student),
            snapshot.date
        );
    }
}