import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { api } from '../config/config';
import Authprovider from '../context/AuthProvider';
import SearchProvider from '../context/SearchProvider';
import Main from './Main';

axios.defaults.baseURL = api;

const App = () => {
  return (
    <SearchProvider>
      <Router>
        <Authprovider>
          <Main />
        </Authprovider>
      </Router>
    </SearchProvider>
  );
}

export default App;
