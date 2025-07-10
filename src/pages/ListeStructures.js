import React from 'react';
import { Link } from 'react-router-dom';


function ListeStructures() {
  return (
    <div>
      <h2>Structures disponibles</h2>
      <ul>
        <li>
          <Link to="/structures/ehpad">EHPAD</Link> 
        </li>
        <li>SSIAD</li>
        <li>Résidences autonomie</li>
      </ul>
    </div>
  );
}

export default ListeStructures;
