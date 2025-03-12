import { useState } from 'react';
import { View, TextInput, TouchableOpacity, SafeAreaView, ImageBackground, Text, Alert, ActivityIndicator } from 'react-native';
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
    const { onLogin } = useAuth();
    const navigation = useNavigation();
    const isOnline = useNetworkStatus();

    const togglePasswordVisibility = () => setSecureText(!secureText);

    const login = async () => {
        if (!num_tel || !password) {
            Toast.show({ 
                type: 'error',
                text1: 'Utilisateur inexistant ou mot de passe incorrect',
                text2: 'Veuillez réesseyer!'
            })
            Alert.alert('Erreur', 'Tous les champs sont obligatoires');
            return;
        }

        setLoading(true);
        const result = await onLogin(num_tel, password);
        setLoading(false);

        if (result?.error) {
            Toast.show({ 
                type: 'error',
                text1: 'Utilisateur inexistant ou mot de passe incorrect',
                text2: 'Veuillez réesseyer!'
            })
        } else {
            navigation.navigate("Home"); 
        }
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/images/city.jpg')} style={styles.head} />
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
            </View>
        </SafeAreaView>
    );
};

export default Login;