import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import { useAuth } from '../context/AuthContext';
import HomeUser from '../screens/HomeUser';
import Login from '../screens/Login';
import ProtectedRoute from '../context/ProtectedRoute'; 
import { Text, TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
    const { onLogout } = useAuth();

    const handleLogout = () => {
        onLogout(); 
    };

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: true, 
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    left: 0,
                    elevation: 0,
                    height: 70,
                },
            }}
        >
            <Tab.Screen
                name="Accueil"
                component={() => (
                    <ProtectedRoute>
                        <HomeUser />
                    </ProtectedRoute>
                )}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? 'home' : 'home-outline'}
                            size={24}
                            color={focused ? COLORS.bgBlue : COLORS.gray2}
                        />
                    ),
                    headerShown: false,
                }}
            />

            <Tab.Screen
                name="Quitter"
                component={Login} 
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="log-out"
                            size={24}
                            color={focused ? COLORS.primary : COLORS.gray2}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TouchableOpacity
                            onPress={handleLogout} 
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Ionicons
                                name="log-out"
                                size={24}
                                color={COLORS.gray2}
                            />
                            <Text style={{ fontSize: 12, color: COLORS.gray2 }}>Quitter</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigation;