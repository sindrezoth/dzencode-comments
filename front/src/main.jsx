import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/AuthProvider.jsx'
import ModalSignProvider from './context/ModalSignProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ModalSignProvider>
        <App />
      </ModalSignProvider>
    </AuthProvider>
  </StrictMode>,
)
