export class Student {
    name: string;
    surname: string;
    courses: string[];
    certifications: string[];

    constructor(name: string, surname: string, courses: string[], certifications: string[]) {
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
            courses: student.courses,
            certifications: student.certifications
        }
    },
    fromJSON: function (snapshot: any): Student {
        return new Student(
            snapshot.name,
            snapshot.surname,
            snapshot.courses,
            snapshot.certifications
        );
    }
}