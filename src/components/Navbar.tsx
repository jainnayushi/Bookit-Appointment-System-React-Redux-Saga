import { Link } from 'react-router-dom';
import logo from '../assets/title-logo.png';
import useAuthToken from '../hooks/useAuthToken';

const Navbar = () => {
  const token = useAuthToken();
  return (
    <nav className="nav">
      <Link to="/" className="logo nav-link">
        <img src={logo} alt="logo" className="title-logo" />
        <h1>Bookit</h1>
      </Link>
      {!token && (
        <Link to="/login" className="nav-link">
          Login
        </Link>
      )}

      {token && (
        <Link to="/logout" className="nav-link">
          Logout
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
