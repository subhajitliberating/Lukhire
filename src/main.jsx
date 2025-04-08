import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css';

import './assets/css/aos.css';
import './assets/css/style.css';
import './assets/css/responsive.css'; 


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
