import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PageAccueil from './pages/PageAccueil';
import Informer from './pages/Informer';
import ListeDispositifs from './pages/ListeDispositifs';
import CarteMentaleCRT from './pages/CarteMentaleCRT';
import Orienter from './pages/Orienter';

function App() {
  return (
    <Router>
      <div>
        {/* Barre de navigation */}
        <nav style={{ background: '#2563eb', padding: '10px' }}>
          <Link to="/" style={{ color: 'white', marginRight: '20px' }}>Accueil</Link>
          <Link to="/minformer" style={{ color: 'white', marginRight: '20px' }}>M'informer</Link>
          <Link to="/morienter" style={{ color: 'white', marginRight: '20px' }}>M’orienter</Link>
          <Link to="/parcourstype" style={{ color: 'white' }}>Mon parcours type</Link>
        </nav>

        {/* Contenu des routes */}
        <Routes>
          <Route path="/" element={<PageAccueil />} />
          <Route path="/minformer" element={<Informer />} />
          <Route path="/dispositifs" element={<ListeDispositifs />} />
          <Route path="/dispositifs/crt" element={<CarteMentaleCRT />} />
          <Route path="/morienter" element={<Orienter />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
