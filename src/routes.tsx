import { JSX } from "react";
import { LoginPage } from "./pages/LoginPage";
import {RegistrationPage} from "./pages/RegistrationPage";

export type RouteType = {
    component: JSX.Element
    isProtected: boolean
    path: string
};
export function getRoutes(): RouteType[] {
    return [
        {
            component: <LoginPage />,
            isProtected: true,
            path: '/login'
        },

        {
            component: <RegistrationPage />,
            isProtected: true,
            path: '/register'
        },
    ];
}
