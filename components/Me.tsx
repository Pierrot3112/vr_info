import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import api from "../config/AxioConfig"; // Importer la config Axios

const Me = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchMe = async () => {
      try {
        const response = await api.get("/me"); 
        setUser(response.data);
        console.log('====================================');
        console.log(response.data.role);
        console.log('====================================');
      } catch (err: any) {
        setError(err.message || "Une erreur s'est produite");
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informations Utilisateur</Text>
      {user ? (
        <>
          <Text style={styles.text}>Nom : {user.name}</Text>
          <Text style={styles.text}>Numero : {user.num_tel}</Text>
          <Text style={styles.text}>Role : {user.role}</Text>
        </>
      ) : (
        <Text>Aucune donnée disponible</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  text: { fontSize: 16, marginBottom: 5 },
  error: { fontSize: 16, color: "red", textAlign: "center" },
});

export default Me;
