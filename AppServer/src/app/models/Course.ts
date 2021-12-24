import { Content, contentConverter } from "./Content";
import { Score, scoreConverter } from "./Score";
import { Teacher, teacherConverter } from "./Teacher";

export class Course {
    name: string;
    teacher: Teacher;
    duration: number;
    pricing: number;
    language: string;
    score: Score[];
    objectives: string[];
    contents: Content[];
    completed: number[];

    constructor(name: string, teacher: Teacher, duration: number, pricing: number, language: string, score: Score[], objectives: string[], contents: Content[], completed: number[]) {
        this.name = name;
        this.teacher = teacher;
        this.duration = duration;
        this.pricing = pricing;
        this.language = language;
        this.score = (score) ? score : [];
        this.objectives = (objectives) ? objectives : [];
        this.contents = (contents) ? contents : [];
        this.completed = (completed) ? completed : [];
    }
}

export const courseConverter = {
    toJSON: function (course: Course) {
        return {
            name: course.name,
            teacher: course.teacher,
            duration: course.duration,
            pricing: course.pricing,
            language: course.language,
            score: course.score.map(scoreConverter.toJSON),
            objectives: course.objectives,
            contents: course.contents.map(contentConverter.toJSON),
            completed: course.completed
        }
    },
    fromJSON: function (snapshot: any): Course {
        return new Course(
            snapshot.name,
            teacherConverter.fromJSON(snapshot.teacher),
            snapshot.duration,
            snapshot.pricing,
            snapshot.language,
            snapshot.score.map(scoreConverter.fromJSON),
            snapshot.objectives,
            snapshot.contents.map(contentConverter.fromJSON),
            snapshot.completed
        );
    }
}