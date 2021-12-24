export class CourseClass {
    name: string;
    file: string;

    constructor(name: string, file: string) {
        this.name = name;
        this.file = file;
    }
}

export const courseClassConverter = {
    toJSON: function (courseClass: CourseClass) {
        return {
            name: courseClass.name,
            file: courseClass.file
        }
    },
    fromJSON: function (snapshot: any): CourseClass {
        return new CourseClass(
            snapshot.name,
            snapshot.file
        );
    }
}