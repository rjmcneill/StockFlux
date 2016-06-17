import configService from '../shared/ConfigService';
import parentStore from './parentStore';
import configureStore from '../child/store/configureStore';
import { initialiseState, childChange, childConnect, childClosed, dummy } from './actions';
import 'babel-polyfill';

let id = 0;
const getId = () => id++;

// Need to increment on drag out also
let openWindows = 0;

function createChildWindows() {
    const store = parentStore([{ id, state: configureStore().getState() }]);
    let storeIsUpdating = false;

    const closedEvent = () => {
        openWindows--;
        // Close the application
        if (openWindows === 0) {
            window.close();
        }
    };

    // Make sure any states loaded from local storage start at index 0
    storeIsUpdating = true;
    store.dispatch(initialiseState());
    storeIsUpdating = false;

    fin.desktop.InterApplicationBus.subscribe(
        '*',
        'childConnected',
        message => {
            const newId = getId();
            storeIsUpdating = true;
            store.dispatch(childConnect(newId));
            storeIsUpdating = false;
            const childState = store.getState().find(state => state.id === newId);
            fin.desktop.InterApplicationBus.publish(
                'initState',
                { state: childState, uuid: message.uuid, id: newId }
            );
        }
    );

    fin.desktop.InterApplicationBus.subscribe(
        '*',
        'childUpdated',
        message => {
            storeIsUpdating = true;
            store.dispatch(childChange(message.state, message.id));
            storeIsUpdating = false;
        }
    );

    fin.desktop.InterApplicationBus.subscribe(
        '*',
        'childClosing',
        message => {
            // If this isn't the final window, remove it from the store so
            // we don't spawn this window next time
            if (openWindows !== 1) {
                storeIsUpdating = true;
                store.dispatch(childClosed(message.id));
                storeIsUpdating = false;
            }
        }
    );

    store.getState().forEach(() => {
        const childWindow = new fin.desktop.Window(
            configService.getWindowConfig(),
            () => childWindow.show()
        );

        openWindows++;

        childWindow.addEventListener('closed', closedEvent);
    });

    store.subscribe(() => {
        if(!storeIsUpdating) {
            console.log('Parent store updated without a child message');
            fin.desktop.InterApplicationBus.publish(
                'change',
                { }
            );            
        }
    });

    function changeStore() {
        store.dispatch(dummy());
    }

    setInterval(() => {
        changeStore();
    }, 3000);
}

fin.desktop.main(() => createChildWindows());
