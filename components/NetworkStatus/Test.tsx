import React, { useEffect } from "react";
import { View, Text, Alert } from "react-native";
import useNetworkStatus from "./NetworkStatus";

const Test: React.FC = () => {
  const isConnected = useNetworkStatus();

  useEffect(() => {
    if (isConnected === false) {
      Alert.alert("Vous êtes hors ligne", "Veuillez vérifier votre connexion.");
    }
  }, [isConnected]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        {isConnected === null
          ? "Vérification de la connexion..."
          : isConnected
          ? "Vous êtes en ligne ✅"
          : "Vous êtes hors ligne ❌"}
      </Text>
    </View>
  );
};

export default Test;
