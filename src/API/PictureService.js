import axios from "axios";

export default class ProfileService {
    static async GetPicture() {
        return await axios.get('http://localhost:8080/profile/get-main-image', {
        })
    }
}