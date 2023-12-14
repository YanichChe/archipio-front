import { makeAutoObservable } from "mobx";

class AuthStore {
    isAuthenticated = localStorage.getItem('isAuthenticated')
    accessToken = localStorage.getItem('accessToken');
    refreshToken = localStorage.getItem('refreshToken');

    login = () => {
        localStorage.setItem('isAuthenticated', 'true');
    };

    logout = () => {
        localStorage.setItem('isAuthenticated', 'false');
    };

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return this.isAuthenticated;
    }
}

export const authStore = new AuthStore();
