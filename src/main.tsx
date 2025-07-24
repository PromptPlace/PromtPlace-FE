import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { registerSW } from 'virtual:pwa-register';

console.log("VITE_DEV_MODE:", import.meta.env.VITE_DEV_MODE);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

if(import.meta.env.VITE_DEV_MODE==='Production'){
  registerSW()
  console.log("✅ Production mode detected. Registering service worker...");
}else{
  console.log("❌ Not in production mode. Skipping service worker registration.");
}

