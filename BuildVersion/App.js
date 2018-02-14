import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './app/store';
import AppComponent from './app/containers/Container';

const app = () => (
    <Provider store={configureStore({})}>
        <AppComponent />
    </Provider>
);

export default app;