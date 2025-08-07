import React from 'react';
import { useNavigate } from 'react-router-dom';

function PageAccueil() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'sans-serif', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <header style={{
        background: '#2865b4',
        color: 'white',
        padding: '30px 0',
        textAlign: 'center',
      }}>
        <h1 style={{ fontSize: '36px', marginBottom: '10px' }}>Parcours</h1>
      </header>

      <main style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 160px)',
        gap: '20px'
      }}>
        <button
          onClick={() => navigate('/minformer')}
          style={{ backgroundColor: '#58c1db', padding: '12px 24px', border: 'none', borderRadius: '10px', fontWeight: 'bold', color: 'white', cursor: 'pointer' }}
        >
          M’informer
        </button>
        <button
          onClick={() => window.location.href = '/formulaire/type_parcours.html'}
          style={{ backgroundColor: '#fb5338', padding: '12px 24px', border: 'none', borderRadius: '10px', fontWeight: 'bold', color: 'white', cursor: 'pointer' }}
        >
          M’orienter
        </button>
        <button
          onClick={() => navigate('/parcourstype')}
          style={{ backgroundColor: '#ffb300', padding: '12px 24px', border: 'none', borderRadius: '10px', fontWeight: 'bold', color: 'white', cursor: 'pointer' }}
        >
          Mon parcours type
        </button>
      </main>
    </div>
  );
}

export default PageAccueil;
