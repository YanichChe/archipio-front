import axios from "axios";
import { authStore } from "../store/AuthStore";

export default class PictureService {
    static async getPicture(uuid) {

        return await axios.get(`http://localhost:8080/files/${uuid}`, {
            responseType: 'blob',
            headers: {
                'Authorization' : 'Bearer '+ authStore.accessToken
            }
        })
    }
}