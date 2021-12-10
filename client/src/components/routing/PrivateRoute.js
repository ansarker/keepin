import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = () => {
  // const { auth } = useAuth();
  const auth = JSON.parse(localStorage.getItem('auth'));
  return (
    auth?.access_token ? <Outlet /> : <Navigate to="/signin" />
  );
}

export default PrivateRoute;