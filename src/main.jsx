import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import './index.css'
import './satoshi.css'
import AuthProvider from './pages/Authentication/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
      
        <App />
       
      </AuthProvider>
    </Router>
  </React.StrictMode>
)