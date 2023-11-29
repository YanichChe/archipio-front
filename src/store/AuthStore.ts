import { makeAutoObservable } from "mobx";

class AuthStore {
    isAuthenticated = true;

    login = () => {
        this.isAuthenticated = true;
    };

    logout = () => {
        this.isAuthenticated = false;
    };

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return this.isAuthenticated;
    }
}

export const authStore = new AuthStore();
