import { Content, contentConverter } from "./Content";
import { Score, scoreConverter } from "./Score";
import { Teacher, teacherConverter } from "./Teacher";

export class Course {
    name: string;
    teacher: Teacher;
    language: string;
    duration: number;
    pricing: number;
    score: Score[];
    objectives: string[];
    content: Content;
    completed: number[];

    constructor(name: string, teacher: Teacher, language: string, score: Score[], objectives: string[], content: Content, completed: number[]) {
        this.name = name;
        this.teacher = teacher;
        this.language = language;
        this.score = score;
        this.objectives = (objectives) ? objectives : [];
        this.content = content;
        this.completed = (completed) ? completed : [];
        this.duration = this.content.topics.map(topic => topic.duration).reduce((a, b) => a + b);
        this.pricing = 0;
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
            contents: contentConverter.toJSON(course.content),
            completed: course.completed
        }
    },
    fromJSON: function (snapshot: any): Course {
        return new Course(
            snapshot.name,
            teacherConverter.fromJSON(snapshot.teacher),
            snapshot.language,
            (snapshot.score) ? snapshot.score.map(scoreConverter.fromJSON) : [],
            snapshot.objectives,
            (snapshot.contents) ? contentConverter.fromJSON(snapshot.contents) : new Content([""], "", []),
            snapshot.completed
        );
    }
}