import axios from "axios";
import { authStore } from "../store/AuthStore";

export default class ProjectService {
    static async createProject(title, description, tags, files, mainImage, visibility) {
        return await axios.post('http://localhost:8080/projects/create-project', {
                title: title,
                description: description,
                tags: tags,
                mainImage: mainImage,
                files: files,
                visibility: visibility !== 'private'
            }, {
                headers: {
                    'Authorization': 'Bearer ' + authStore.accessToken,
                }
            }
        )
    }

    static async uploadFile(mainImage , project) {

        const url =
            "http://localhost:8080/files/upload"

        return await axios.post(url, {
            file: mainImage,
            project: project
            }, {
                headers: {
                    'Authorization': 'Bearer ' + authStore.accessToken,
                    'content-type': 'multipart/form-data'
                }
            }
        )
    }

    static async getProject(projectTitle) {
        return await axios.get(`http://localhost:8080/projects/get-full-project/${projectTitle}`, {
            params: {
                projectTitle: projectTitle
            },
            headers: {
                'Authorization': 'Bearer ' + authStore.accessToken
            }
        })
    }

    static async updateProject(title, description, tags, files, mainImage, visibility) {
        return await axios.post('http://localhost:8080/projects/update-project', {
                title: title,
                description: description,
                tags: tags,
                files: files,
                mainImage: mainImage,
                visibility: visibility
            }, {
                headers: {
                    'Authorization': 'Bearer ' + authStore.accessToken,
                    "Content-Type": "multipart/form-data"
                }
            }
        )
    }

    static async deleteProject(title) {
        return await axios.delete('http://localhost:8080/projects', {
                params: {
                    title: title,
                },
                headers: {
                    'Authorization': 'Bearer ' + authStore.accessToken
                }

            }
        )
    }

    static async getAllProjects() {
        return await axios.get('http://localhost:8080/projects/get-all-public-projects', {
            headers: {
                'Authorization': 'Bearer ' + authStore.accessToken
            }
        })
    }

    static async getAllUserProjects(userLogin) {
        return await axios.get(`http://localhost:8080/projects/get-all-user-projects/${userLogin}`, {
            headers: {
                'Authorization': 'Bearer ' + authStore.accessToken
            }
        })
    }

    static async getFile(uuid) {
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