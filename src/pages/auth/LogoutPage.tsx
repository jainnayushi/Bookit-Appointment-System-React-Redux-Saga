import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/action/authAction';
import useAuthToken from '../../hooks/useAuthToken';

const LogoutPage = () => {
  const dispatch = useDispatch();
  const token = useAuthToken();
  useEffect(() => {
    dispatch(logoutUser(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="header">
      <h1>You are successfully logged off</h1>
      <Link to="/login" className="link">
        Login Again!
      </Link>
    </div>
  );
};

export default LogoutPage;
