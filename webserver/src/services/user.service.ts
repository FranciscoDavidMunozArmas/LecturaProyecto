import axios from "axios"
import { getAuthorizationToken } from "../libs/tokenInterceptor";
import { URI } from "../libs/utils"

export const authorize = async (login: any) => {
    return await axios.post(`${URI}/users/authorize`, { login: login });
}