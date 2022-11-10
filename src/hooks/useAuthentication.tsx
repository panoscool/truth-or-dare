import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function useAuthentication() {
  return useContext(AuthContext);
}

export default useAuthentication;