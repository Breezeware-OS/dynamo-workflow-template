import React from 'react';
import ReactDOM from 'react-dom/client';
import {AmplifyProvider, Authenticator} from '@aws-amplify/ui-react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AmplifyProvider>
    <Authenticator.Provider>
      <React.StrictMode>
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      </React.StrictMode>
    </Authenticator.Provider>
  </AmplifyProvider>,
);

// if (process.env.REACT_APP_ENVIRONMENT === 'production') {
//   console.log = function () {};
// }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
