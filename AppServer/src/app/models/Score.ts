export class Score {
    userID: string;
    score: number;

    constructor(userID: string, score: number) {
        this.userID = userID;
        this.score = score;
    }
}

export const scoreConverter = {
    toJSON: function (score: Score) {
        return {
            userID: score.userID,
            score: score.score
        }
    },
    fromJSON: function (snapshot: any): Score {
        return new Score(
            snapshot.userID,
            snapshot.score
        );
    }
}