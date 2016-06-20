import configService from '../shared/ConfigService';
import configureStore from '../child/store/configureStore';
import 'babel-polyfill';

let id = 0;
const getId = () => id++;

// Need to increment on drag out also
let openWindows = 0;

function createChildWindows() {
    window.store = configureStore();

    const closedEvent = () => {
        openWindows--;
        // Close the application
        if (openWindows === 0) {
            window.close();
        }
    };

    fin.desktop.InterApplicationBus.subscribe(
        '*',
        'childConnected',
        message => {
            const newId = getId();
            fin.desktop.InterApplicationBus.publish(
                'initId',
                { uuid: message.uuid, id: newId }
            );
        }
    );

    const childWindow = new fin.desktop.Window(
        configService.getWindowConfig(),
        () => childWindow.show()
    );

    childWindow.addEventListener('closed', closedEvent);
}

fin.desktop.main(() => createChildWindows());
