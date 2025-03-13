import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Modal } from 'react-native';
import styles from '../../styles/home.style';
import api from '../../config/AxioConfig'; 
import UpdateSegment from '../../components/UpdateSegment';
import { COLORS, SIZES } from '../../constants';

const HomeUser = () => {
    const [segments, setSegments] = useState([]); 
    const [selectedSegment, setSelectedSegment] = useState(null); 
    const [modalVisible, setModalVisible] = useState(false); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    // Récupérer les segments depuis l'API
    useEffect(() => {
        const fetchSegments = async () => {
            try {
                const response = await api.get('/users/segments'); 
                setSegments(response.data); 
            } catch (error) {
                setError("Erreur lors de la récupération des segments. Veuillez réessayer.");
            } finally {
                setLoading(false); 
            }
        };

        fetchSegments();
    }, []);

    // Fonction pour gérer le clic sur un segment
    const handleSegmentClick = (segment) => {
        setSelectedSegment(segment); 
        setModalVisible(true); 
    };

    return (
        <SafeAreaView style={styles.global}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Mon Espace</Text>
            </View>

            {loading ? (
                <Text style={{marginTop: SIZES.height/2, textAlign: 'center', color: COLORS.primary, }}>Chargement en cours ...</Text>
            ) : error ? (
                <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
            ) : (
                <ScrollView style={styles.scrollSegmentContainer}>
                    {segments.map((segment) => (
                        <TouchableOpacity
                            key={segment.segment_id}
                            onPress={() => handleSegmentClick(segment)}
                            style={styles.segmentContainer}
                        >
                            <View>  {/* Point de départ */}
                                <Text style={styles.segmentId}>Numero: {segment.segment_id}</Text>
                                <View style={styles.point}>
                                    <Ionicons name="location-outline" size={18} color="green" />
                                    <Text style={styles.textPont}>{segment.point_depart_nom}</Text>
                                </View>
                                <View style={styles.point}>
                                    <Ionicons name="flag-outline" size={18} color="red" /> 
                                    <Text style={styles.textPont}>{segment.point_arrivee_nom}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}

            {/* Modal pour afficher les détails du segment */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <UpdateSegment
                    selectedSegment={selectedSegment}
                    onClose={() => setModalVisible(false)}
                />
            </Modal>
        </SafeAreaView>
    );
};

export default HomeUser;