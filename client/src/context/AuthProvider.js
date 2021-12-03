import React, { createContext } from 'react';
import useAuthentication from '../hooks/useAuthentication';

export const AuthContext = createContext({});

const Authprovider = ({ children }) => {
  const authContext = useAuthentication();
  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
}

export default Authprovider;
