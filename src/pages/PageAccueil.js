import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PageAccueil() {
  const [carteType, setCarteType] = useState('structures');
  const navigate = useNavigate();

  const handleClick = (type) => {
    setCarteType(type);
    navigate('/dispositifs');
  };

  return (
    <div style={{ fontFamily: 'sans-serif', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <header style={{
        background: '#2865b4',
        color: 'white',
        padding: '30px 0',
        textAlign: 'center',
      }}>
        <h1 style={{ fontSize: '36px', marginBottom: '10px' }}>Parcours</h1>
        <nav style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
          <a href="#" style={{ color: 'white', fontWeight: 'bold' }}>M’informer</a>
          <a href="#" style={{ color: 'white', fontWeight: 'bold' }}>M’orienter</a>
          <a href="#" style={{ color: 'white', fontWeight: 'bold' }}>Mon parcours type</a>
        </nav>
      </header>

      <main style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 160px)',
      }}>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
          <button
            onClick={() => handleClick('structures')}
            style={{ backgroundColor: '#58c1db', padding: '10px 20px', border: 'none', borderRadius: '10px', fontWeight: 'bold', color: 'white', cursor: 'pointer' }}
          >
            Structures
          </button>
          <button
            onClick={() => handleClick('dispositifs')}
            style={{ backgroundColor: '#58c1db', padding: '10px 20px', border: 'none', borderRadius: '10px', fontWeight: 'bold', color: 'white', cursor: 'pointer' }}
          >
            Dispositifs
          </button>
        </div>
        <p>Chargement de la carte : {carteType}</p>
      </main>
    </div>
  );
}

export default PageAccueil;
