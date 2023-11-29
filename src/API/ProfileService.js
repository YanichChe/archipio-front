import axios from "axios";
import { authStore } from "../store/AuthStore";

export default class ProfileService {
    static async getProfile() {
        return await axios.get('http://localhost:8080/profile/show', {
            headers: {
                'Authorization' : 'Bearer '+ authStore.accessToken
            }
        })
    }
}