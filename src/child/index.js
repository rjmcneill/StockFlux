import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import App from './containers/App';
import 'babel-polyfill';
import configureStore from './store/configureStore';

import './assets/styles/style.less';

fin.desktop.main(() => {
    let store;

    fin.desktop.InterApplicationBus.publish(
        'childConnected',
        { uuid: window.name }
    );
    // window.opener.dispatchEvent(new CustomEvent('childConnected', {
    //     detail: {
    //         uuid: window.name
    //     }
    // }));

    fin.desktop.InterApplicationBus.subscribe(
        '*',
        'initState',
        message => {
            console.log('initState: ' + message.uuid);
            if (message.uuid === window.name) {
                store = configureStore(message.state);

                store.subscribe(() => {
                    fin.desktop.InterApplicationBus.publish(
                        'childUpdated',
                        { store, uuid: window.name }
                    );
                });

                render(
                    <Provider store={store}>
                        <App />
                    </Provider>,
                    document.getElementById('app')
                );
            }
        }
    );
});
