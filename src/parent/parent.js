import configService from '../shared/ConfigService';
import parentStore from './parentStore';
import configureStore from '../child/store/configureStore';
import { childChange, childConnect } from './actions';
import 'babel-polyfill';

function createChildWindows() {
    const store = parentStore({ childWindows: [], childStores: [configureStore()] });

    store.getState().childStores.forEach((childStore) => {
        const childWindow = new fin.desktop.Window(
            configService.getWindowConfig(),
            () => childWindow.show()
        );

        const closedEvent = () => {
            // Close the application
            window.close();
        };

        childWindow.addEventListener('closed', closedEvent);

        fin.desktop.InterApplicationBus.subscribe(
            '*',
            'childConnected',
            message => {
                store.dispatch(childConnect(message.uuid));
                console.log('child connected: ' + message.uuid);
                fin.desktop.InterApplicationBus.publish(
                    'initState',
                    { state: childStore.getState(), uuid: message.uuid }
                );
            }
        );
        // window.addEventListener('childConnected', () => {
        //     store.dispatch(childConnect(event.detail.uuid));
        //     console.log('child connected');
        //     childWindow.contentWindow.dispatchEvent(new CustomEvent('initState', {
        //         detail: {
        //             state: childStore.getState(),
        //             uuid: childWindow.name
        //         }
        //     }));
        // });


        fin.desktop.InterApplicationBus.subscribe(
            '*',
            'childUpdated',
            message => {
                console.log('updated uuid: ' + message.uuid);
                store.dispatch(childChange(message.state, message.index));
            }
        );


    });
}

fin.desktop.main(() => createChildWindows());
