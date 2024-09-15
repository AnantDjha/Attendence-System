import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AdminProvider from './context/adminContext.jsx'

createRoot(document.getElementById('root')).render(
  <AdminProvider>

    <App />
  </AdminProvider>
)
