import React, { useContext } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'
import './index.css';

function MainApp() {
  const { token } = useContext(AuthContext);
  return token ? <Dashboard /> : <Login />;
}

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
