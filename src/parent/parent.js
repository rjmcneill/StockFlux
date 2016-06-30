import configService from '../shared/ConfigService';
import parentStore from './parentStore';
import configureStore from '../child/store/configureStore';
import { initialiseState, childClosed } from './actions';
import 'babel-polyfill';

import { open } from '../child/actions/window';

let id = 0;
const getId = () => id++;

// Need to increment on drag out also
let openWindows = 0;

function createChildWindows() {
    fin.desktop.Window.getCurrent().contentWindow.store = parentStore();

    const closedEvent = () => {
        openWindows--;
        // Close the application
        if (openWindows === 0) {
            window.close();
        }
    };

    // Make sure any states loaded from local storage start at index 0
    fin.desktop.Window.getCurrent().contentWindow.store.dispatch(initialiseState());

    fin.desktop.InterApplicationBus.subscribe(
        '*',
        'childConnected',
        message => {
            const newId = getId();
            fin.desktop.InterApplicationBus.publish(
                'childId',
                { uuid: message.uuid, windowId: newId }
            );
        }
    );

    fin.desktop.InterApplicationBus.subscribe(
        '*',
        'childClosing',
        message => {
            // If this isn't the final window, remove it from the store so
            // we don't spawn this window next time
            console.log('closing');
            if (openWindows !== 1) {
                store.dispatch(childClosed(message.windowId));
            }
        }
    );

    for (let childWindow in fin.desktop.Window.getCurrent().contentWindow.store.getState()) {
        const childWindow = new fin.desktop.Window(
            configService.getWindowConfig(),
            () => childWindow.show()
        );

        openWindows++;

        childWindow.addEventListener('closed', closedEvent);
    }

    const childWindow = new fin.desktop.Window(
        configService.getWindowConfig(),
        () => childWindow.show()
    );

    openWindows++;

    childWindow.addEventListener('closed', closedEvent);
}

fin.desktop.main(() => createChildWindows());
