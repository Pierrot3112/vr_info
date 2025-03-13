import React, { ReactNode, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';

interface PullToRefreshProps {
    children: ReactNode;
    onRefresh: () => Promise<void>; 
}

const PullToRefresh: React.FC<PullToRefreshProps> = ({ children, onRefresh }) => {
    const [refreshing, setRefreshing] = useState(false);

    // Fonction appelée lors du rafraîchissement
    const handleRefresh = async () => {
        setRefreshing(true); 
        await onRefresh(); 
        setRefreshing(false); 
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    colors={['#0000ff']} 
                    tintColor="#0000ff" 
                />
            }
        >
            {children}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
});

export default PullToRefresh;