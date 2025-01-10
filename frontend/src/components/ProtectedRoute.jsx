import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import corrigé
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN, USERNAME } from "../constants";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post('/api/token/refresh/', {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                const decoded = jwtDecode(res.data.access); // Décoder le nouveau token
                localStorage.setItem(USERNAME, decoded.username)
                setIsAuthorized(true);
            }
        } catch (error) {
            console.error("Error refreshing token:", error);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            localStorage.setItem(USERNAME, decoded.username)
            setIsAuthorized(true);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>; // Chargement pendant la vérification de l'autorisation
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;