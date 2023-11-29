import { JSX } from "react";
import { LoginPage } from "./pages/LoginPage";

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
    ];
}
