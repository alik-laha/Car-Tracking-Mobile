import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { getAuth, clearAuth } from "../../utils/auth";

type AuthContextType = {
    loggedIn: boolean;
    loginSuccess: () => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        const { apiKey, apiSecret } = await getAuth();
        setLoggedIn(!!apiKey && !!apiSecret);
        setLoading(false);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const loginSuccess = () => {
        setLoggedIn(true);
    };

    const logout = async () => {
        await clearAuth();
        setLoggedIn(false);
    };

    if (loading) return null; // splash screen placeholder

    return (
        <AuthContext.Provider
            value={{
                loggedIn,
                loginSuccess,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return ctx;
};
