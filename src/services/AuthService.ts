import axios from "axios";

export default class AuthService {
    static async login(email: String, password: String) {
        return await axios.post('http://localhost:8080/auth/login', {
            email: email,
            password: password
        })
    }

    static async register(login: String, email: String, password: String) {
        return await axios.post('http://localhost:8080/auth/register', {
            login: login,
            email: email,
            password: password
        })
    }
}