import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from './pages/LoginPage';
import Home from './pages/HomePage';
import AnalisePage from "./pages/AnalisePage";
import InsumosPage from "./pages/InsumosPage";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { ToastContainer } from 'react-toastify';
import { checkAuthStatus } from './features/authSlice';

const App = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  const isAuthenticated = status === 'loggedIn';
  const navigate = useNavigate();  

  useEffect(() => {
    dispatch(checkAuthStatus()); //Check auth status on app load
  }, [dispatch]);

  useEffect(() => {
    if (status === 'loggedIn' && window.location.pathname === "/login") {
      navigate('/'); // Redirect to home if already logged in
    }
  }, [status, navigate]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/analise-progresso" element={isAuthenticated ? <AnalisePage /> : <Navigate to="/login" replace />} />
        <Route path="/insumos" element={isAuthenticated ? <InsumosPage /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
      </Routes>
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;