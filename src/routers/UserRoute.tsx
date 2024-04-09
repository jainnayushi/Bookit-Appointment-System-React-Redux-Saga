import { Navigate } from 'react-router-dom';
import { RouteProps } from '../utils/types';
import useAuthToken from '../hooks/useAuthToken';

const UserRoute = ({ children }: RouteProps) => {
  const token = useAuthToken();
  return token ? children : <Navigate to="/login" />;
};

export default UserRoute;
