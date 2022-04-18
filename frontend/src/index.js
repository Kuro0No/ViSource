import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { AuthProvider } from './hooks/useAuth';
// import { useAuthProvider } from './hooks/useAuth'


ReactDOM.render(
 

    <BrowserRouter>
      <AuthProvider>

        <App />
      </AuthProvider>

    </BrowserRouter>
 ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
