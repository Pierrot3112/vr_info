import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import URL from "../util/api.url";
import NetInfo from '@react-native-community/netinfo';

const api = axios.create({
    baseURL: URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Fonction pour vérifier la connexion Internet
const checkInternetConnection = async () => {
    const state = await NetInfo.fetch();
    return state.isConnected;
};

// Intercepteur pour ajouter le token Bearer à chaque requête
api.interceptors.request.use(
    async (config) => {
        const isConnected = await checkInternetConnection();
        if (!isConnected) {
            throw new axios.Cancel('No internet connection');
        }

        try {
            const token = await AsyncStorage.getItem("token"); 
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error("❌ Erreur lors de la récupération du token:", error);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Intercepteur pour gérer les erreurs globalement
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isCancel(error)) {
            console.error("❌ Requête annulée:", error.message);
            // Vous pouvez afficher une notification à l'utilisateur ici
        } else if (error.response) {
            console.error("❌ Erreur API:", error.response.data);
        } else {
            console.error("❌ Erreur réseau ou autre:", error.message);
        }
        return Promise.reject(error);
    }
);

export default api;