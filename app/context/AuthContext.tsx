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
    onLogout: () => void;
    checkToken: () => Promise<string | null>;
    getRole: (token: string | null) => Promise<string>;
    setAuthState: (authState: AuthState) => void; // Ajout de setAuthState
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

    useEffect(() => {
        const loadToken = async () => {
            try {
                const token = await checkToken();
                if (token) {
                    setAuthState({ token, authenticated: true });
                } else {
                    setAuthState({ token: null, authenticated: false });
                }
            } catch (error) {
            }
        };
        loadToken();
    }, []);

    const login = async (num_tel: string, password: string) => {
        try {
            const response = await api.post("/token", { num_tel, password });
            const token = response.data.access_token;

            await AsyncStorage.setItem(TOKEN_KEY, token);
            setAuthState({ token, authenticated: true });

            return { error: false, msg: "Connexion réussie", token }; // Retourne le token
        } catch (error: any) {
            return { error: true, msg: error.response?.data?.msg || "Échec de la connexion" };
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem(TOKEN_KEY);
            setAuthState({ token: null, authenticated: false });
        } catch (error) {
        }
    };

    const getRole = async (token: string | null): Promise<string> => {
        if (!token) throw new Error("Aucun token fourni");
        try {
            const response = await api.get("/me", {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data.role; // Assurez-vous que la réponse contient la propriété "role"
        } catch (error) {
            throw error;
        }
    };

    const checkToken = async (): Promise<string | null> => {
        try {
            const token = await AsyncStorage.getItem(TOKEN_KEY);
            return token;
        } catch (error) {
            return null;
        }
    };

    return (
        <AuthContext.Provider value={{ authState, onLogin: login, onLogout: logout, checkToken, getRole, setAuthState }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;