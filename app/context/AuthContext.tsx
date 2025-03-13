import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../../config/AxioConfig";

const TOKEN_KEY = "token";

interface AuthState {
    token: string | null;
    authenticated: boolean;
}

interface AuthContextProps {
    authState: AuthState;
    onLogin: (num_tel: string, password: string) => Promise<{ error?: boolean; msg?: string; token?: string }>;
    onLogout: () => Promise<void>;
    checkToken: () => Promise<string | null>;
    getRole: (token: string) => Promise<string>;
    setAuthState: (authState: AuthState) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth doit être utilisé dans un AuthProvider");
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>({ token: null, authenticated: false });

    const checkToken = async (): Promise<string | null> => {
        return await AsyncStorage.getItem(TOKEN_KEY);
    };

    useEffect(() => {
        const loadToken = async () => {
            const token = await checkToken();
            setAuthState({ token, authenticated: !!token });
        };
        loadToken();
    }, []);

    const login = async (num_tel: string, password: string) => {
        try {
            const response = await api.post("/token", { num_tel, password });
            const token = response.data.access_token;

            await AsyncStorage.setItem(TOKEN_KEY, token);
            setAuthState({ token, authenticated: true });

            return { error: false, msg: "Connexion réussie", token };
        } catch (error: any) {
            console.error("Erreur lors de la connexion :", error);
            return { error: true, msg: error.response?.data?.msg || "Échec de la connexion" };
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem(TOKEN_KEY);
        setAuthState({ token: null, authenticated: false });
    };

    const getRole = async (token: string): Promise<string> => {
        try {
            const response = await api.get("/me", {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data.role;
        } catch (error) {
            console.error("Erreur lors de la récupération du rôle :", error);
            throw new Error("Impossible de récupérer le rôle");
        }
    };

    return (
        <AuthContext.Provider value={{ authState, onLogin: login, onLogout: logout, checkToken, getRole, setAuthState }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
