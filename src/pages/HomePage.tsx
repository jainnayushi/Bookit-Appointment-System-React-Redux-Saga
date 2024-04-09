import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <h3 className="header">Choose your Role!</h3>
      <div className="landing">
        <div className="box">
          <Link to="/admin" className="link">
            Admin
          </Link>
        </div>
        <div className="box">
          <Link to="/doctor" className="link">
            Doctor
          </Link>
        </div>
        <div className="box">
          <Link to="/patient" className="link">
            Patient
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
