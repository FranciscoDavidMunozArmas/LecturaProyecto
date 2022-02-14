class CourseData {
    courseID: string;
    completed: string[];
    status: boolean;

    constructor(courseID: string, completed: string[], status: boolean) {
        this.courseID = courseID;
        this.completed = completed;
        this.status = status;
    }
}

const courseDataConverter = {
    toJSON: function (courseData: CourseData) {
        return {
            courseID: courseData.courseID,
            completed: courseData.completed,
            status: courseData.status
        }
    },
    fromJSON: function (courseData: any) {
        return new CourseData(
            courseData.courseID,
            courseData.completed,
            courseData.status
        );
    }
}

export class Student {
    name: string;
    surname: string;
    courses: CourseData[];
    certifications: string[];

    constructor(name: string, surname: string, courses: CourseData[], certifications: string[]) {
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
            courses: (student.courses) ? student.courses.map(courseDataConverter.toJSON) : [],
            certifications: student.certifications
        }
    },
    fromJSON: function (snapshot: any): Student {
        return new Student(
            snapshot.name,
            snapshot.surname,
            (snapshot.courses) ? snapshot.courses.map(courseDataConverter.fromJSON) : [],
            snapshot.certifications
        );
    }
}