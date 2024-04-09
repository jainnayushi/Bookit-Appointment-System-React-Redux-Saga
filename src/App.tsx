import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routers/AppRouter';
import Navbar from './components/Navbar';
import '../src/styles/index.css';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <AppRouter />
      <Footer />
    </Router>
  );
}

export default App;
