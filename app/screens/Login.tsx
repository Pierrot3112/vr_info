import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, SafeAreaView, ImageBackground, Text, ActivityIndicator, KeyboardAvoidingView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from "@react-navigation/native";
import styles from '../../styles/Login.style';
import useNetworkStatus from '../../components/NetworkStatus/NetworkStatus';
import Toast from 'react-native-toast-message';

const Login = () => {
    const [num_tel, setNumTel] = useState('');
    const [password, setPassword] = useState('');
    const [secureText, setSecureText] = useState(true);
    const [loading, setLoading] = useState(false);
    const { onLogin, getRole } = useAuth(); // Ajout de getRole
    const navigation = useNavigation();
    const isOnline = useNetworkStatus();

    const togglePasswordVisibility = () => setSecureText(!secureText);

    const login = async () => {
        if (!num_tel || !password) {
            Toast.show({ 
                type: 'error',
                text1: 'Tous les champs sont obligatoires',
                text2: 'Veuillez réesseyer!'
            });
            return;
        }

        setLoading(true);
        const result = await onLogin(num_tel, password);

        if (result?.error) {
            Alert.alert('Erreur de connexion', result.msg || 'Utilisateur inexistant ou mot de passe incorrect');
            Toast.show({
                type: 'error',
                text1: 'Erreur de connexion',
                text2: result.msg || 'Utilisateur inexistant ou mot de passe incorrect',
            });
        } else {
            try {
                const role = await getRole(result.token); // Utilisez le token retourné par onLogin
                if (role !== 'client') {
                    navigation.navigate('Home');
                } else {
                    Alert.alert('Vous n\'êtes pas un informateur!', 'Veuillez reconnecter');
                    Toast.show({
                        type: 'error',
                        text1: 'Accès refusé',
                        text2: 'Vous n\'avez pas les permissions nécessaires.',
                    });
                }
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: 'Une erreur est survenue lors de la vérification du rôle.',
                });
            }
        }

        setLoading(false);
    };

    return (
        <SafeAreaView>
            <KeyboardAvoidingView style={styles.container}>
                <ImageBackground source={require('../../assets/images/city.jpg')} style={styles.head} />
                <ImageBackground source={require('../../assets/images/logoVoieRapide.jpeg')} style={styles.logo} />
                <View style={styles.title}>
                    <Text style={styles.titleText}>Authentification</Text>
                </View>
                <View style={styles.formLogin}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Numéro de téléphone"
                        onChangeText={setNumTel}
                        value={num_tel}
                        keyboardType="phone-pad"
                    />
                    <View style={styles.inputPassword}>
                        <TextInput
                            style={styles.input}
                            placeholder="Mot de passe"
                            secureTextEntry={secureText}
                            onChangeText={setPassword}
                            value={password}
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility}>
                            <Ionicons name={secureText ? "eye-outline" : "eye-off-outline"} size={24} color="gray" style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.btnSubmit} onPress={login} disabled={loading}>
                        <Text style={styles.btnSubmitText}>Se Connecter</Text>
                    </TouchableOpacity>
                    
                    {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 10 }} />}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Login;