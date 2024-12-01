import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import { MyProvider } from './context/MyContext';

const GOOGLE_CLIENT_ID = "781081733032-r8k4hfnm9minb59480mu9msa6virdkjj.apps.googleusercontent.com";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </MyProvider>
  </StrictMode>,
)
