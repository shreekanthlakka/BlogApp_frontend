import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Navigate, useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const { isLoading, loggedInUser, isAuthenticated, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            await loggedInUser();
        })();
    }, []);

    if (!isLoading && !isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    if (isAuthenticated) return children;
}

export default ProtectedRoute;
