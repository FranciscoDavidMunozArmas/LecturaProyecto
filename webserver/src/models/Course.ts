import { Content, contentConverter } from "./Content";
import { Score, scoreConverter } from "./Score";
import { Teacher, teacherConverter } from "./Teacher";

export class Course {
    id: string;
    name: string;
    teacher: Teacher;
    language: string;
    duration: number;
    pricing: number;
    score: Score[];
    objectives: string[];
    content: Content;

    constructor(id: string, name: string, teacher: Teacher, language: string, score: Score[], objectives: string[], content: Content) {
        this.id = (id) ? id : "";
        this.name = name;
        this.teacher = teacher;
        this.language = language;
        this.score = score;
        this.objectives = (objectives) ? objectives : [];
        this.content = content;
        this.duration = (this.content.topics.length !== 0) ?
            this.content.topics
                .map(topic => topic.duration)
                .reduce((a, b) => a + b) : 0;
        this.pricing = 0;
    }
}

export const courseConverter = {
    toJSON: function (course: Course) {
        return {
            id: course.id,
            name: course.name,
            teacher: teacherConverter.toJSON(course.teacher),
            duration: course.duration,
            pricing: course.pricing,
            language: course.language,
            score: course.score.map(scoreConverter.toJSON),
            objectives: course.objectives,
            content: contentConverter.toJSON(course.content),
        }
    },
    fromJSON: function (snapshot: any): Course {
        return new Course(
            snapshot.id,
            snapshot.name,
            teacherConverter.fromJSON(snapshot.teacher),
            snapshot.language,
            (snapshot.score) ? snapshot.score.map(scoreConverter.fromJSON) : [],
            snapshot.objectives,
            (snapshot.content) ? contentConverter.fromJSON(snapshot.content) : new Content([""], "", []),
        );
    }
}