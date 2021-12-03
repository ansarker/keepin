import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = (props) => {
  

  let token = JSON.parse(localStorage.getItem('auth'));
  return (
    token._id_token_ ? <Outlet /> : <Navigate to="/signin" />
  );
}

export default PrivateRoute;