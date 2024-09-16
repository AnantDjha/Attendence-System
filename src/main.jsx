import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AdminProvider from './context/adminContext.jsx'
import EmpProvider from './context/empContext.jsx'

createRoot(document.getElementById('root')).render(
  <AdminProvider>
    <EmpProvider>

      <App />
    </EmpProvider>

  </AdminProvider>
)
