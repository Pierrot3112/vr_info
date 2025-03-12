import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper'; 
import { AuthProvider, useAuth } from './app/context/AuthContext';
import Home from './app/screens/Home';
import Login from './app/screens/Login';
import Splash from './app/screens/Splash';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <AuthProvider>
            <Layout />
        </AuthProvider>
    );
}

export const Layout = () => {
    const { authState } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Simule un chargement de 2 secondes
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
                            <Stack.Screen name="Home" component={Home} />
                    ) : (
                        <>
                            <Stack.Screen name="Login" component={Login} />
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
};
