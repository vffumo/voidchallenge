// src/components/Home.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Home = () => {
  const { user } = useSelector((state) => state.auth);
 
  return (
    <div>
      <h2>Welcome,</h2>
      <h3>voi_challenge</h3>
      <ul>
      <li>
            <Link to={`/analise-progresso/`}>Análise - Progresso</Link>
            <Link to={`/insumos/`}>Insumos</Link>
      </li>
      </ul>
    </div>
  );
};

export default Home;
