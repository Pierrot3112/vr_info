import React, { useEffect, useState } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

const NetworkStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false); // Toujours un `boolean`

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setIsConnected(state.isConnected ?? false); // Utilise `false` si `state.isConnected` est `null`
    });

    return () => unsubscribe();
  }, []);

  return null;
};

export const checkConnection = async (): Promise<boolean> => {
  const state = await NetInfo.fetch();
  return state.isConnected ?? false; // Retourne `false` si `state.isConnected` est `null`
};

export default NetworkStatus;