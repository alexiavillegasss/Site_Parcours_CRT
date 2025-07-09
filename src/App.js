import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CarteMentaleCRT from './CarteMentaleCRT'; // Ton composant carte mentale
import Home from './Home'; // Page d'accueil ou autre composant principal

function App() {
  return (
    <Router>
      <div>
        <nav style={{ background: '#2865b4', padding: '10px' }}>
          <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', margin: 0, padding: 0 }}>
            <li>
              <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Accueil</Link>
            </li>
            <li>
              <Link to="/morienter/dispositifs" style={{ color: 'white', textDecoration: 'none' }}>Dispositifs</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/morienter/dispositifs" element={<CarteMentaleCRT />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
