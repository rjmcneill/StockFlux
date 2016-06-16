import configService from '../shared/ConfigService';

let windowArray = [];

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

    windowArray.push(mainWindow);
}

window.addEventListener('childHB', () => {
    console.log('ChildHB received, responding');
    fin.desktop.Window.getCurrent().contentWindow.dispatchEvent(new CustomEvent('parentHB'))
});

fin.desktop.main(() => createMainWindow());
