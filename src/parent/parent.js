import configService from '../shared/ConfigService';
import parentStore from './store/configureStore';
import 'babel-polyfill';

function createChildWindow(windowName, dimensions) {
    const childWindow = new fin.desktop.Window(
        configService.getWindowConfig(windowName, dimensions),
        () => childWindow.show()
    );
}

function createChildWindows() {
    const store = parentStore();
    fin.desktop.Window.getCurrent().contentWindow.store = store;

    // Subscribe to the store so we can avoid having the side effect
    // of closing the parent window in a reducer
    store.subscribe(() => {
        if (!Object.keys(store.getState()).length) {
            fin.desktop.Window.getCurrent().contentWindow.close();
        }
    });

    if (!Object.keys(store.getState()).length) {
        createChildWindow();
    } else {
        const windowNames = Object.keys(store.getState());
        windowNames.forEach((windowName, index) => {
            const newWindowName = windowName === 'undefined' ? null : windowName;
            let dimensions = configService.getDefaultWindowDimensions();

            console.log(typeof(store.getState()[windowNames[index]].windowState.isCompact));
            
            if (store.getState()[windowNames[index]].windowState.isCompact) {
                dimensions = configService.getCompactWindowDimensions();
            } else {
                console.log(dimensions);
            }
            
            createChildWindow(newWindowName, dimensions);
        });
    }
}

fin.desktop.main(() => createChildWindows());
