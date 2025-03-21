import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { AuthProvider, useAuth } from './app/context/AuthContext';
import Login from './app/screens/Login';
import Splash from './app/screens/Splash';
import Home from './app/screens/Home';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <AuthProvider>
            <Layout />
        </AuthProvider>
    );
}

export const Layout = () => {
    const { authState, getRole, setAuthState, checkToken } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const loadTokenAndRole = async () => {
            try {
                const token = await checkToken();
                if (token) {
                    const role = await getRole(token);
                    setUserRole(role);
                    setAuthState({ token, authenticated: true });
                } else {
                    setAuthState({ token: null, authenticated: false });
                }
            } catch (error) {
                console.error("❌ Erreur lors du chargement du token ou du rôle :", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadTokenAndRole();
    }, []);

    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: '#6200ee',
            accent: '#03dac4',
        },
    };

    if (isLoading) {
        return <Splash />;
    }

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {authState.authenticated ? (
                        userRole !== 'client' ? (
                            <Stack.Screen name="Home" component={Home} /> // Affichez Home si l'utilisateur est authentifié et que son rôle n'est pas 'client'
                        ) : (
                            <Stack.Screen name="Login" component={Login} /> // Affichez Login si l'utilisateur est un client
                        )
                    ) : (
                        <Stack.Screen name="Login" component={Login} /> // Affichez Login si l'utilisateur n'est pas authentifié
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
};