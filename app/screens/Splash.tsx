import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, Image, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import styles from '../../styles/splash.style';
import { checkToken, getRole } from '../context/AuthContext';
type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    Home: undefined;
};

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;
type SplashScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

interface SplashProps {
    navigation: SplashScreenNavigationProp;
    route?: SplashScreenRouteProp;
}

const Splash: React.FC<SplashProps> = ({ navigation }) => {
    const text1Position = useSharedValue(-200);
    const text2Position = useSharedValue(200);
    const loaderOpacity = useSharedValue(0);  // Opacité des points du loader

    useEffect(() => {
        text1Position.value = withTiming(0, { duration: 1000 });
        text2Position.value = withTiming(0, { duration: 1000 });

        const timeout1 = setTimeout(() => {
            text1Position.value = withTiming(200, { duration: 1000 });
            text2Position.value = withTiming(-200, { duration: 1000 });
        }, 4000);

        const timeout2 = setTimeout(() => {
            navigation.navigate('Login');
        }, 5000);

        const checkAuth = async () => {
            const token = await checkToken();
            if (token) {
                try {
                    const role = await getRole(token);
                    navigation.navigate(role !== 'client' ? 'Home' : 'Login');
                } catch {
                    navigation.navigate('Login');
                }
            } else {
                navigation.navigate('Login');
            }
        };

        checkAuth();

        // Activation de l'animation du loader
        loaderOpacity.value = withTiming(1, { duration: 3000, easing: Easing.linear });

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
        };
    }, [navigation]);

    const animatedText1Style = useAnimatedStyle(() => ({
        transform: [{ translateX: text1Position.value }]
    }));

    const animatedText2Style = useAnimatedStyle(() => ({
        transform: [{ translateX: text2Position.value }]
    }));

    const loaderStyle = useAnimatedStyle(() => ({
        opacity: loaderOpacity.value,
    }));

    return (
        <SafeAreaView style={styles.home}>
            <View style={styles.container}>
                <Animated.Text style={[styles.text, animatedText1Style]}>Voie Rapide</Animated.Text>
                
                {/* Image centrée */}
                <View style={styles.imageContainer}>
                    <Image source={require('../../assets/logoVoieRapide.png')} style={styles.logo} />
                </View>

                {/* Loader avec trois points animés */}
                <Animated.View style={[styles.loaderContainer, loaderStyle]}>
                    <Text style={styles.loaderText}>.</Text>
                    <Text style={styles.loaderText}>.</Text>
                    <Text style={styles.loaderText}>.</Text>
                </Animated.View>
                
                <Animated.Text style={[styles.text, animatedText2Style]}>Tongasoa !</Animated.Text>
            </View>
        </SafeAreaView>
    );
};

export default Splash;

