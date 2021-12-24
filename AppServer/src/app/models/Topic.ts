import { CourseClass, courseClassConverter } from "./CourseClass";

export class Topic {
    name: string;
    duration: number;
    classes: CourseClass[];

    constructor(name: string, duration: number, classes: CourseClass[]) {
        this.name = name;
        this.duration = duration;
        this.classes = (classes) ? classes : [];
    }
}

export const topicConverter = {
    toJSON: function (topic: Topic) {
        return {
            name: topic.name,
            duration: topic.duration,
            classes: topic.classes.map(courseClassConverter.toJSON)
        }
    },
    fromJSON: function (snapshot: any): Topic {
        return new Topic(
            snapshot.name,
            snapshot.duration,
            snapshot.classes.map(courseClassConverter.fromJSON)
        );
    }
}