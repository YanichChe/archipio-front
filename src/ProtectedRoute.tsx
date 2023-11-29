import { Navigate } from "react-router-dom";

import { RouteType } from "./routes";
import { authStore } from "./store/AuthStore";

export function ProtectedRoute({ route }: { route: RouteType }) {
    return (
        <>
            { authStore.isAuthenticated ? <>{route.component}</> : <Navigate replace={true} to="/login" /> }
        </>
    );
}
