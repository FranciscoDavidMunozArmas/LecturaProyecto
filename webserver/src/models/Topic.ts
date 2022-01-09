import { CourseClass, courseClassConverter } from "./CourseClass";

export class Topic {
    id: string;
    name: string;
    duration: number;
    classes: CourseClass[];

    constructor(id: string, name: string, classes: CourseClass[]) {
        this.id = id;
        this.name = name;
        this.classes = classes;
        // this.duration = (classes.length !== 0) ? classes.map(courseClass => courseClass.duration).reduce((a, b) => a + b) : 0;
        this.duration = 0;
    }
}

export const topicConverter = {
    toJSON: function (topic: Topic) {
        return {
            id: topic.id,
            name: topic.name,
            duration: topic.duration,
            classes: topic.classes.map(courseClassConverter.toJSON)
        }
    },
    fromJSON: function (snapshot: any): Topic {
        return new Topic(
            snapshot.id,
            snapshot.name,
            (snapshot.classes) ? snapshot.classes.map(courseClassConverter.fromJSON) : []
        );
    }
}