// src/components/Home.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../features/authSlice';

const Home = () => {
    const dispatch = useDispatch();
    const [username, setEmail] = useState('alexandre.coelho@ubi.co.mz');
    const [password, setPassword] = useState('ubidev987');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(loginUser({ username: username, password: password }));
    };
 
  return (
    <>
    <div className="page-container text-left-all">
      <div className="w-100 mt-1">
        <h1 className='mb-3 welcome-header'><span className='fw-light'>AutoLogin</span> // VoidChallenge</h1>
        
        <p className='spaced-p'>:: GET Token for API</p> 
        <div className='w-100 d-flex'>
          <div className='d-block mb-4'></div>
        </div>

        <p className='mt-5'><strong>Click here:</strong></p>
        <button className='btn btn-md p-3 btn-rounded btn-success' onClick={handleSubmit}><strong>AUTO LOGIN</strong></button>
        

        <div className='d-block pt-5'>
          <p className='spaced-xp mt-5'> @ VAYILE FUMO </p>
        </div>
         
      </div>
    </div>
 
    </>
  );
};

export default Home;
