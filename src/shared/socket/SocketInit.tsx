import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { disconnectSocket, initSocket } from './apis/socket';

const SocketInit = () => {
  const { accessToken } = useAuth();

  useEffect(() => {
    if (!accessToken) return;

    initSocket(accessToken);

    return () => {
      disconnectSocket();
    };
  }, [accessToken]);

  return null;
};

export default SocketInit;
