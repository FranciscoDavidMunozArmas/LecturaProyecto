import { Topic, topicConverter } from "./Topic";

export class Content {
    requirements: string[];
    description: string;
    topics: Topic[];

    constructor(requirements: string[], description: string, topics: Topic[]) {
        this.description = description;
        this.requirements = (requirements) ? requirements : [];
        this.topics = (topics) ? topics : [];
    }
}

export const contentConverter = {
    toJSON: function (content: Content) {
        return {
            requirements: content.requirements,
            description: content.description,
            topics: content.topics.map(topicConverter.toJSON)
        }
    },
    fromJSON: function (snapshot: any): Content {
        return new Content(
            snapshot.requirements,
            snapshot.description,
            snapshot.topics.map(topicConverter.fromJSON)
        );
    }
}