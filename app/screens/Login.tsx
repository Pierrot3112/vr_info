import React, { useState } from 'react';
import { 
    View, TextInput, TouchableOpacity, SafeAreaView, 
    ImageBackground, Text, ActivityIndicator, KeyboardAvoidingView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from "@react-navigation/native";
import styles from '../../styles/Login.style';
import useNetworkStatus from '../../components/NetworkStatus/NetworkStatus';
import Toast from 'react-native-toast-message';
import PullToRefresh from '../../components/PullToRefresh'; 

const Login = () => {
    const [num_tel, setNumTel] = useState('');
    const [password, setPassword] = useState('');
    const [secureText, setSecureText] = useState(true);
    const [loading, setLoading] = useState(false);
    const { onLogin, getRole } = useAuth();
    const navigation = useNavigation<any>(); 
    const isOnline = useNetworkStatus();

    const togglePasswordVisibility = () => setSecureText(!secureText);

    // Fonction de rafraîchissement
    const handleRefresh = async () => {
        // Réinitialiser les champs ou effectuer des actions de réinitialisation
        setNumTel('');
        setPassword('');
    };

    const login = async () => {
        if (!num_tel || !password) {
            Toast.show({ 
                type: 'error',
                text1: 'Tous les champs sont obligatoires',
                text2: 'Veuillez réessayer!'
            });
            return;
        }

        setLoading(true);
        try {
            const result = await onLogin(num_tel, password);
            if (result?.error) {
                Toast.show({
                    type: 'error',
                    text1: 'Erreur de connexion',
                    text2: result.msg || 'Utilisateur inexistant ou mot de passe incorrect',
                });
            } else {
                const role = await getRole(result.token);
                if (role !== 'client') {
                    navigation.navigate('Home');
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Accès refusé',
                        text2: 'Vous n\'avez pas les permissions nécessaires.',
                    });
                }
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: 'Une erreur est survenue lors de la connexion.',
            });
        }
        setLoading(false);
    };

    return (
        <PullToRefresh onRefresh={handleRefresh}>
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
        </PullToRefresh>
    );
};

export default Login;
