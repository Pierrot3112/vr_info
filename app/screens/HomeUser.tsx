import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import styles from '../../styles/home.style';
import api from '../../config/AxioConfig';
import UpdateSegment from '../../components/UpdateSegment';
import { COLORS, SIZES } from '../../constants';
import PullToRefresh from '../../components/PullToRefresh';

const formatTimeDifference = (diffInMinutes) => {
    if (diffInMinutes === null || isNaN(diffInMinutes)) {
        return "N/A";
    }

    if (diffInMinutes < 1) {
        const diffInSeconds = Math.floor(diffInMinutes * 60);
        return `${diffInSeconds} seconde${diffInSeconds > 1 ? 's' : ''}`;
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
    } else {
        const diffInHours = Math.floor(diffInMinutes / 60);
        return `${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
    }
};

const HomeUser = () => {
    const [segments, setSegments] = useState([]);
    const [selectedSegment, setSelectedSegment] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSegments = async () => {
        try {
            const response = await api.get('/users/segments');
            const updatedSegments = response.data.map((segment) => {
                const lastUpdate = new Date(segment.last_update);
                const now = new Date();

                if (!isNaN(lastUpdate.getTime())) {
                    const diffInMs = now.getTime() - lastUpdate.getTime();
                    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

                    return { ...segment, diffInMinutes };
                }

                return { ...segment, diffInMinutes: null };
            });

            setSegments(updatedSegments);
            setError(null);
        } catch (error) {
            setError("Erreur lors de la récupération des segments. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSegments();
    }, []);

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
                <Text style={{ marginTop: SIZES.height / 2, textAlign: 'center', color: COLORS.primary }}>
                    Chargement en cours ...
                </Text>
            ) : error ? (
                <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
            ) : (
                <PullToRefresh onRefresh={fetchSegments}>
                    <View style={styles.scrollSegmentContainer}>
                        {segments.map((segment) => {
                            const segmentStyle = segment.diffInMinutes !== null && segment.diffInMinutes >= 10
                                ? [styles.segmentContainer, { borderWidth: 2, borderColor: 'red' }]
                                : styles.segmentContainer;

                            return (
                                <TouchableOpacity
                                    key={segment.segment_id}
                                    onPress={() => handleSegmentClick(segment)}
                                    style={segmentStyle}
                                >
                                    <View>
                                        <Text style={styles.segmentId}>
                                            Numero: {segment.segment_id} {"\n"}
                                            Dernière mise à jour: {formatTimeDifference(segment.diffInMinutes)}
                                        </Text>
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
                            );
                        })}
                    </View>
                </PullToRefresh>
            )}

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