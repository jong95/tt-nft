import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import rootReducer from './modules';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Web3 from 'web3';
import { Web3ReactProvider } from '@web3-react/core';
import { MetaMaskProvider } from './hooks/metamask';

const store = createStore(rootReducer, composeWithDevTools());

function getLibrary(provider, connector) {
  return new Web3(provider);
}

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <MetaMaskProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </MetaMaskProvider>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
