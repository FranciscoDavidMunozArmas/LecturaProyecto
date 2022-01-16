import { PATH_CERTIFICATES, PATH_HOME, PATH_MY_COURSES } from "./utils";

export const routes: any = {
    children: [
        {
            text: "HOME",
            path: PATH_HOME,
            children: [
                { text: "NUEVOS CURSOS" },
                { text: "MEJORES CURSOS" },
                { text: "RECOMENDADOS" },
            ]
        },
        {
            text: "MIS CURSOS",
            path: PATH_MY_COURSES,
            children: [
                { text: "COMPLETADOS" },
                { text: "NO COMPLETADOS" }
            ]
        },
        {
            text: "CERTIFICADOS",
            path: PATH_CERTIFICATES,
        }
    ],
}