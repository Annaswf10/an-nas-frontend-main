import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n';
import './apiClient'; // admin request-এ login token যোগ করে

import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/style.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
