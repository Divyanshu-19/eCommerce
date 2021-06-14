import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App';
import setupMockServer from "./api/mockServer";
import { UserDataProvider } from "./context/dataContext"

// setupMockServer();

ReactDOM.render(
  <React.StrictMode>
      <UserDataProvider>
        <Router>
          <App />
        </Router>
      </UserDataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


