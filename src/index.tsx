import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import MainApplication from './components/app/app';
import store from './services/store';
const rootElement = document.getElementById('root') as HTMLElement;
const reactRoot = ReactDOMClient.createRoot(rootElement!);

reactRoot.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <MainApplication />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
