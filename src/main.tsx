import React from 'react';
import ReactDOM from 'react-dom/client';
import 'reflect-metadata';

import App from './App';
import './index.css';

import "primereact/resources/themes/md-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';

import { InjectorContainerProvider } from './core/providers/service.provider';
import servicesContainerInjector from './core/injector/service.injector';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { core } from './core';
import store from './store';
core();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <InjectorContainerProvider container={servicesContainerInjector}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </InjectorContainerProvider>
    </Provider>
  </React.StrictMode>
);
