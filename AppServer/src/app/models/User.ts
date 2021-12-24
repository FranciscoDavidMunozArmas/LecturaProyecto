export class User {
    login: string;
    user: string;
    role: string;

    constructor(login: string, user: string, role: string) {
        this.login = login;
        this.user = user;
        this.role = role;
    }
}

export const userConverter = {
    toJSON: function (user: User) {
        return {
            login: user.login,
            user: user.user,
            role: user.role
        }
    },
    fromJSON: function (snapshot: any): User {
        return new User(
            snapshot.login, 
            snapshot.user, 
            snapshot.role
            );
    }
}