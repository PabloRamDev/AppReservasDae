import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './context/AuthContext.jsx'
import { createGlobalStyle } from 'styled-components'
import './config/i18n'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
      <AuthProvider>
        <App/>
      </AuthProvider>
  </React.StrictMode>
)
