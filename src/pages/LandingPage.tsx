/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import useAuthRole from '../hooks/useAuthRole';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const role = useAuthRole();
  const navigate = useNavigate();
  useEffect(() => {
    switch (role) {
      case 'admin':
        alert('Successfully logged in as Admin!');
        navigate('/admin');
        return;
      case 'doctor':
        alert('Successfully logged in as Doctor!');
        navigate('/doctor');
        return;
      case 'patient':
        alert('Successfully logged in as Patient!');
        navigate('/patient');
        break;
      default:
        alert('Invalid Credentials!');
        navigate('/login');
    }
  });
  return <div></div>;
};

export default LandingPage;
