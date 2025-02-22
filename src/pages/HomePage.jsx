// src/components/Home.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Home = () => {
//   const { user } = useSelector((state) => state.auth);
 
  return (
    <div className="page-container text-left-all">
      <div className="w-100 mt-1">
        <h1 className='mb-3 welcome-header'>Welcome,</h1>
        
        <p className='spaced-p'>:: void_challenge</p> 
        <div className='w-100 d-flex'>
          <div className='d-block mb-4'></div>
        </div>
        <ul className='mt-5 '> 
        <li className='mb-2'>
                <Link to={`/analise-progresso/`}> {'>'} Análise - Progresso</Link>
        </li>
        <li>
                <Link to={`/insumos/`}> {'>'} Insumos</Link>
        </li>
        </ul>

        <div className='d-block pt-5'>
          <p className='spaced-xp mt-5'>@ VAYILE FUMO</p>
        </div>
         
      </div>
    </div>
  );
};

export default Home;
