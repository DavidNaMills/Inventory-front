import './styles/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AxiosInterceptor from './Axios/AxiosInterceptor';
import { LocaleProvider } from './Context/LocaleContext';

import App from './App';
import store from './store/storeConfig';

const app = () => (
    <Provider store={store}>
        <LocaleProvider>
            <BrowserRouter>
                <AxiosInterceptor>
                    <App />
                </AxiosInterceptor>
            </BrowserRouter>
        </LocaleProvider>
    </Provider>
)

ReactDOM.render(app(), document.getElementById('root'));

