import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import URL from "../util/api.url";
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';

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
            throw new axios.Cancel('Pas de connexion Internet');
        }

        try {
            const token = await AsyncStorage.getItem("token"); 
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            // Gestion silencieuse des erreurs liées au token
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
            Toast.show({
                type: "info",
                text1: "Requête annulée",
                text2: error.message,
            });
        } else if (error.response) {
            const { status, data } = error.response;

            switch (status) {
                case 400:
                    Toast.show({
                        type: "error",
                        text1: "Requête invalide",
                        text2: data.message || "Les données envoyées sont incorrectes.",
                    });
                    break;
                case 401:
                    Toast.show({
                        type: "error",
                        text1: "Non autorisé",
                        text2: "Votre session a expiré. Veuillez vous reconnecter.",
                    });
                    break;
                case 403:
                    Toast.show({
                        type: "error",
                        text1: "Accès interdit",
                        text2: "Vous n'avez pas les permissions nécessaires.",
                    });
                    break;
                case 404:
                    Toast.show({
                        type: "error",
                        text1: "Non trouvé",
                        text2: "La ressource demandée est introuvable.",
                    });
                    break;
                case 422:
                    Toast.show({
                        type: "error",
                        text1: "Données invalides",
                        text2: "Veuillez vérifier les champs du formulaire.",
                    });
                    break;
                case 500:
                    Toast.show({
                        type: "error",
                        text1: "Erreur serveur",
                        text2: "Une erreur interne est survenue. Réessayez plus tard.",
                    });
                    break;
                case 503:
                    Toast.show({
                        type: "error",
                        text1: "Service indisponible",
                        text2: "Le serveur est temporairement indisponible.",
                    });
                    break;
                default:
                    Toast.show({
                        type: "error",
                        text1: "Erreur inconnue",
                        text2: "Une erreur est survenue, veuillez réessayer.",
                    });
            }
        } else {
            Toast.show({
                type: "error",
                text1: "Erreur réseau",
                text2: "Veuillez vérifier votre connexion Internet.",
            });
        }

        return Promise.reject(error);
    }
);

export default api;
