import configService from '../shared/ConfigService';
import parentStore from './parentStore';
import configureStore from '../child/store/configureStore';
import { childChange, childConnect } from './actions';
import 'babel-polyfill';

let id = 0;
const getId = () => id++;

// Need to increment on drag out also
let openWindows = 0;

function createChildWindows() {
    const store = parentStore([{ id, state: configureStore().getState() }]);

    const closedEvent = () => {
        openWindows--;
        if (openWindows === 0) {
            // Close the application
            window.close();
        }
    };

    fin.desktop.InterApplicationBus.subscribe(
        '*',
        'childConnected',
        message => {
            const newId = getId();
            store.dispatch(childConnect(newId));
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
            store.dispatch(childChange(message.state, message.id));
        }
    );

    store.getState().forEach(childState => {
        const childWindow = new fin.desktop.Window(
            configService.getWindowConfig(),
            () => childWindow.show()
        );

        openWindows++;

        childWindow.addEventListener('closed', closedEvent);
    });

    // const childWindow = new fin.desktop.Window(
    //     configService.getWindowConfig(),
    //     () => childWindow.show()
    // );
}

fin.desktop.main(() => createChildWindows());
