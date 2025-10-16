import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './main.jsx';
import { AuthProvider } from "./context/AuthContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Main />
    </AuthProvider>
  </React.StrictMode>
);