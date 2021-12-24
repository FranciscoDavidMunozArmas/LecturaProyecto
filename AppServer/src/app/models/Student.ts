import { Certificate, certificateConverter } from "./Certificate";
import { Course, courseConverter } from "./Course";

export class Student {
    name: string;
    surname: string;
    courses: Course[];
    certifications: Certificate[];

    constructor(name: string, surname: string, courses: Course[], certifications: Certificate[]) {
        this.name = name;
        this.surname = surname;
        this.courses = (courses) ? courses : [];
        this.certifications = (certifications) ? certifications : [];
    }
}

export const studentConverter = {
    toJSON: function (student: Student) {
        return {
            name: student.name,
            surname: student.surname,
            courses: student.courses.map(courseConverter.toJSON),
            certifications: student.certifications.map(certificateConverter.toJSON)
        }
    },
    fromJSON: function (snapshot: any): Student {
        return new Student(
            snapshot.name,
            snapshot.surname,
            snapshot.courses.map(courseConverter.fromJSON),
            snapshot.certifications.map(certificateConverter.fromJSON)
        );
    }
}