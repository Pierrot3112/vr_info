import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing, ActivityIndicator, Alert } from 'react-native';
import { COLORS, SIZES } from '../constants';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import api from '../config/AxioConfig';

interface Segment {
    segment_id: number;
    point_depart_nom: string;
    point_arrivee_nom: string;
}

interface UpdateSegmentProps {
    selectedSegment: Segment | null;
    onClose: () => void;
}

const AnimatedText = ({ text }: { text: string }) => {
    const translateX = useRef(new Animated.Value(100)).current; 

    useEffect(() => {
        Animated.loop(
            Animated.timing(translateX, {
                toValue: -200,
                duration: 5000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    return (
        <View style={styles.textContainer}>
            <Animated.Text style={[styles.animatedText, { transform: [{ translateX }] }]}>
                {text}
            </Animated.Text>
        </View>
    );
};

const UpdateSegment: React.FC<UpdateSegmentProps> = ({ selectedSegment, onClose }) => {
    const [selectedValue, setSelectedValue] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const items = [
        { label: 'Moins de 50m', value: '50' },
        { label: '50 - 150m', value: '150' },
        { label: '150 - 300m', value: '300' },
        { label: '300 - 500m', value: '500' },
        { label: 'Plus de 500m', value: '0' },
    ];

    const handleSave = async () => {
        if (!selectedSegment) {
            Alert.alert('Infos', 'Aucun segment sélectionné.');
            return;
        }

        if (!selectedValue) {
            Alert.alert('Infos', 'Veuillez sélectionner une longueur d\'embouteillage.');
            return;
        }

        if (!description) {
            Alert.alert('Infos', 'Veuillez ajouter une description.');
            return;
        }
        setLoading(true);

        try {
            const response = await api.post('/informations', { 
                connection_id: selectedSegment.segment_id,
                longueur_embouteillage: parseInt(selectedValue, 10),
                description
            });

            if (response.status === 201) {
                Alert.alert('Succès', 'Les données ont été enregistrées avec succès.');
            } else {
                Alert.alert('Infos', 'Erreur de l\'enregistrement.');
            }
        } catch (error: any) {
            Alert.alert('Infos', 'Segment invalid');
        } finally {
            setLoading(false);
        }

    };

    return (
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                {selectedSegment && (
                    <>
                        <View style={styles.modalTitle}>
                            <AnimatedText text={selectedSegment.point_depart_nom} />
                            <Ionicons name='arrow-forward-outline' size={24} />
                            <AnimatedText text={selectedSegment.point_arrivee_nom} />
                        </View>
                        <RNPickerSelect
                            placeholder={{ label: 'Choisir...', value: '' }}
                            items={items}
                            onValueChange={(value) => setSelectedValue(value)}
                            value={selectedValue}
                            style={pickerSelectStyles}
                        />
                        <TextInput
                            placeholder='Description'
                            style={styles.observationInput}
                            value={description}
                            onChangeText={setDescription}
                        />
                    </>
                )}

                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <View style={styles.bottomBtn}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={onClose}
                        >
                            <Text style={styles.closeButtonText}>Fermer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleSave}
                        >
                            <Text style={styles.submitButtonText}>Enregistrer</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        width: SIZES.width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '100%',
        padding: 20,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    modalTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    textContainer: {
        width: 120,
        overflow: 'hidden',
    },
    animatedText: {
        fontSize: 16,
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
    },
    button: {
        marginTop: 10,
        padding: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 30,
        alignItems: 'center',
        width: '48%'
    },
    closeButtonText: {
        color: 'black',
        fontWeight: 'bold',
    },
    saveButton: {
        marginTop: 10,
        padding: 15,
        backgroundColor: '#2196F3',
        borderRadius: 30,
        alignItems: 'center',
        width: '48%'
    },
    bottomBtn: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    observationInput: {
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        color: COLORS.gray2,
    },
});

// Styles pour RNPickerSelect
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
        marginBottom: 15,
        backgroundColor: COLORS.gray
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
        marginBottom: 15,
        backgroundColor: COLORS.gray
    },
});

export default UpdateSegment;
