import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RouteProps, StateType } from '../utils/types';

const DoctorRoute = ({ children }: RouteProps) => {
  const token = useSelector((state: StateType) => state.authData.token);
  const role = useSelector((state: StateType) => state.authData.role);
  const isDoctor = token && role === 'doctor';
  return isDoctor ? children : <Navigate to="/login" />;
};

export default DoctorRoute;
