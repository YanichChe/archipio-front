import axios from "axios";
import {authStore} from "../store/AuthStore";

export default class ProfileService {
    static async getProfile() {
        return await axios.get('http://localhost:8080/profile/show', {
            headers: {
                'Authorization': 'Bearer ' + authStore.accessToken
            }
        })
    }

    static async editLogin(login) {
        return await axios.put('http://localhost:8080/profile/edit/login', {
                login: login,
            },
            {
                headers: {
                    'Authorization': 'Bearer ' + authStore.accessToken
                }
            })
    }

    static async editPassword(oldPassword, newPassword) {
        return await axios.put('http://localhost:8080/profile/edit/password', {
            oldPassword: oldPassword,
            newPassword: newPassword,
            headers: {
                'Authorization': 'Bearer ' + authStore.accessToken
            }
        })
    }

    static async editMainImage(file) {
        return await axios.put('http://localhost:8080/profile/edit/main-image', {
            multipartFile: file,
            headers: {
                'Authorization': 'Bearer ' + authStore.accessToken
            }
        })
    }
}