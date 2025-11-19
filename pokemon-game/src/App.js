import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Formulario from './components/Formulario';
import Juego from './components/Juego'
import Pokemon from './components/Pokemon';

function App() {
  return (
    <Router>
      <div className="d-flex">
        <nav className="flex-column p-3 bg-black text-light" style={{ height: '100vh' }}>
          <h3 className="text-primary">React</h3>
          <Link to="/" className="nav-link p-2">Inicio</Link>
          <Link to="/formulario" className="nav-link p-2">Formulario</Link>
          <Link to="/juego" className="nav-link p-2">Juego</Link>
          <Link to="/pokemon" className="nav-link p-2">Pokemon</Link>
        </nav>

        <div className="p-3">
          <Routes>
            <Route path="/" element={<h2>Bienvenido a mi pagina principal</h2>} />
            <Route path="/formulario" element={<Formulario />} />
            <Route path="/juego" element={<Juego />} />
            <Route path="/pokemon" element={<Pokemon />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
