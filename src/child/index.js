import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import App from './containers/App';
import 'babel-polyfill';
import configureStore from './store/configureStore';

import './assets/styles/style.less';

fin.desktop.main(() => {
    fin.desktop.InterApplicationBus.subscribe(
        '*',
        'initId',
        message => {
            const { uuid, id } = message;
            if (uuid === window.name) {
                window.id = id;
                const store = window.opener.store;

                render(
                    <Provider store={store}>
                        <App />
                    </Provider>,
                    document.getElementById('app')
                );
            }
        }
    );

    fin.desktop.InterApplicationBus.publish(
        'childConnected',
        { uuid: window.name }
    );
});
