import axios from "axios";

export default class SettingsStore {
    static async settings(email: string, password: string) {
        return await axios.post('https://localhost:8080/auth/settings', {
            email: email,
            password: password
        })
    }
}