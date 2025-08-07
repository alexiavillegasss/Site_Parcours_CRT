import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import PageAccueil from './pages/PageAccueil';
import Informer from './pages/Informer';
//import Orienter from './pages/Orienter';
import ListeStructures from './pages/ListeStructures';
import ListeDispositifs from './pages/ListeDispositifs';
import CarteMentaleCRT from './pages/CarteMentaleCRT';
import MorienterForm from './pages/MorienterForm';
import CarteMentaleEHPAD from './pages/CarteMentaleEHPAD';

function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div>
      {/* Barre de navigation affichée uniquement si on n’est PAS sur la page d’accueil */}
      {!isHome && (
        <nav style={{ background: '#2563eb', padding: '10px' }}>
          <a href="/minformer" style={{ color: 'white', marginRight: '20px' }}>M'informer</a>
          <a href="/morienter" style={{ color: 'white', marginRight: '20px' }}>M’orienter</a>
          <a href="/parcourstype" style={{ color: 'white' }}>Mon parcours type</a>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<PageAccueil />} />
        <Route path="/minformer" element={<Informer />} />
        <Route path="/structures" element={<ListeStructures />} />
        <Route path="/dispositifs" element={<ListeDispositifs />} />
        <Route path="/dispositifs/crt" element={<CarteMentaleCRT />} />
        <Route path="/structures/ehpad" element={<CarteMentaleEHPAD />} />
        <Route path="/morienter" element={<MorienterForm />} />
        <Route path="/morienter/dispositifs/crt" element={<CarteMentaleCRT />} />
        {/* Ajoute ici "parcourstype" plus tard si tu as une page */}
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
