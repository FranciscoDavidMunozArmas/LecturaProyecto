export class CourseClass {
    id: string;
    name: string;
    file: string;

    constructor(id: string, name: string, file: string) {
        this.id = id;
        this.name = name;
        this.file = file;
    }
}

export const courseClassConverter = {
    toJSON: function (courseClass: CourseClass) {
        return {
            id: courseClass.id,
            name: courseClass.name,
            file: courseClass.file
        }
    },
    fromJSON: function (snapshot: any): CourseClass {
        return new CourseClass(
            snapshot.id,
            snapshot.name,
            snapshot.file
        );
    }
}