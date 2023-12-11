import axios from "axios";

export default class ProfileService {
    static async GetMainImage(email, login) {
        return await axios.get('/profile/get-main-image', {
            params: {
                email: email,
                login: login
            }
        })
    }
}