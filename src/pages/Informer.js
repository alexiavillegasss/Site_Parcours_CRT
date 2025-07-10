import React from 'react';
import { Link } from 'react-router-dom';

function Informer() {
  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#2865b4' }}>M'informer</h1>

      <p style={{ maxWidth: '800px', marginBottom: '30px' }}>
        Avant de vous orienter, il est utile de comprendre la différence entre une <strong>structure</strong> et un <strong>dispositif</strong> dans le domaine de la santé et du social.
      </p>

      <h2 style={{ color: '#fb5338' }}> Qu’est-ce qu’une structure ?</h2>
      <p style={{ maxWidth: '800px', marginBottom: '20px' }}>
        Une <strong>structure</strong>, c’est un lieu qui accueille directement les personnes. 
        Par exemple : un EHPAD, un centre de santé, un hôpital ou un CCAS. 
        On peut s’y rendre pour être accompagné, soigné ou aidé.
      </p>

      <Link to="/structures">
        <button style={{ backgroundColor: '#fb5338', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', marginBottom: '40px' }}>
          Voir la liste des structures
        </button>
      </Link>

      <h2 style={{ color: '#58c1db' }}> Qu’est-ce qu’un dispositif ?</h2>
      <p style={{ maxWidth: '800px', marginBottom: '20px' }}>
        Un <strong>dispositif</strong>, c’est une aide pour organiser ou coordonner votre parcours. 
        Il ne vous accueille pas directement, mais il soutient les professionnels pour que vous receviez l’aide la plus adaptée. 
        Par exemple : le DAC, un CRT, ou une équipe mobile.
      </p>

      <p style={{ maxWidth: '800px', marginBottom: '20px' }}>
        Les dispositifs sont souvent rattachés à une structure, mais ils ont un rôle d’organisation, pas d’accueil.
      </p>

      <Link to="/dispositifs">
        <button style={{ backgroundColor: '#58c1db', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
          Voir la liste des dispositifs
        </button>
      </Link>
    </div>
  );
}

export default Informer;
