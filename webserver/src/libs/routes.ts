import { CERTIFICATES_NAME, HOME_NAME, MY_COURSES_NAME, PATH_CERTIFICATES, PATH_HOME, PATH_MY_COURSES, SUBSECTION_HOME_1_NAME, SUBSECTION_HOME_2_NAME, SUBSECTION_HOME_3_NAME, SUBSECTION_MY_COURSES_1_NAME, SUBSECTION_MY_COURSES_2_NAME } from "./utils";

export const routes: any = {
    teacher: [
        {
            text: HOME_NAME,
            path: PATH_HOME,
        }
    ],
    children: [
        {
            text: HOME_NAME,
            path: PATH_HOME,
            children: [
                { text: SUBSECTION_HOME_1_NAME },
                { text: SUBSECTION_HOME_2_NAME },
                { text: SUBSECTION_HOME_3_NAME },
            ]
        },
        {
            text: MY_COURSES_NAME,
            path: PATH_MY_COURSES,
            children: [
                { text: SUBSECTION_MY_COURSES_1_NAME },
                { text: SUBSECTION_MY_COURSES_2_NAME }
            ]
        },
        {
            text: CERTIFICATES_NAME,
            path: PATH_CERTIFICATES,
        }
    ],
}