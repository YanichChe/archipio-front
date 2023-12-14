import axios from "axios";
import {authStore} from "../store/AuthStore";

export default class ProfileService {
    static async getPicture(uuid) {
        return await axios.get('http://localhost:8080/files', {
            params : {
                'uuid': uuid
            },
            headers: {
                'Authorization' : 'Bearer '+ authStore.accessToken
            }
        })
    }
}