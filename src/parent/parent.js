import configService from '../shared/ConfigService';
import initReducers from './reducers.js';

function createMainWindow() {

    const mainWindow = new fin.desktop.Window(
        configService.getWindowConfig(),
        () => mainWindow.show()
    );

    const closedEvent = () => {
        // Close the application
        window.close();
    };

    mainWindow.addEventListener('closed', closedEvent);
    initReducers();
}

fin.desktop.main(() => createMainWindow());
