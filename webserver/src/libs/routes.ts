import { PATH_CERTIFICATES, PATH_HOME, PATH_MY_COURSES } from "./utils";

export const routes: any = {
    children: [
        {
            text: "HOME",
            path: PATH_HOME,
            children: [
                { text: "NEW COURSES" },
                { text: "TOP COURSES" },
                { text: "RECOMMENDED" },
            ]
        },
        {
            text: "MY COURSES",
            path: PATH_MY_COURSES,
            children: [
                { text: "COMPLETED" },
                { text: "NOT COMPLETED" }
            ]
        },
        {
            text: "CERTIFICATES",
            path: PATH_CERTIFICATES,
        }
    ],
}