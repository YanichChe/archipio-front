import { JSX } from "react";
import { LoginPage } from "./pages/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { EmailConsiderPage } from "./pages/EmailConsiderPage";
import { SettingsPage } from "./pages/SettingsPage";
import { ProfilePage } from "./pages/ProfilePage";

export type RouteType = {
    component: JSX.Element
    isProtected: boolean
    path: string
};
export function getRoutes(): RouteType[] {
    return [
        {
            component: <LoginPage />,
            isProtected: false,
            path: '/login'
        },

        {
            component: <RegistrationPage />,
            isProtected: false,
            path: '/register'
        },

        {
            component: <EmailConsiderPage />,
            isProtected: false,
            path: '/email-consider'
        },

        {
            component: <SettingsPage />,
            isProtected: true,
            path: '/settings'
        },

        {
            component: <ProfilePage />,
            isProtected: true,
            path: '/user'
        },
    ];
}
