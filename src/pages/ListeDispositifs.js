import { Link } from 'react-router-dom';

function ListeDispositifs() {
  return (
    <div>
      <h2>Dispositifs disponibles</h2>
      <ul>
        <li><Link to="/dispositifs/crt">CRT</Link></li>
        {/* Tu pourras ajouter d’autres ici */}
      </ul>
    </div>
  );
}

export default ListeDispositifs;