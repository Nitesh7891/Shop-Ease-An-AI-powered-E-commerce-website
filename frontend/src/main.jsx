import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthContext from './context/authContext.jsx'
import UserContext from './context/userContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthContext>
   <UserContext>
    <App />
    </UserContext>
    </AuthContext>
  </BrowserRouter>,
)
