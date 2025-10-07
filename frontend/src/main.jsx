import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AuthContextProvider } from './contexts/authContext.jsx';
import Routes from './routes/index.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  </StrictMode>,
);
