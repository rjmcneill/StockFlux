import ACTION_TYPES from '../child/constants/actionTypes.js';

let states = {
    windows: [],
    states: {}
};

let state = {
    selection,
    sidebar: {
        showSearch: true
    },
    favourites: {
        codes: [],
        names: {}
    },
    window: {
        isCompact: false,
        isMaximised: false
    }
};

export default function initialiseActions() {
    for (let action in ACTION_TYPES.SIDEBAR) {
        window.addEventListener(action, () => {
            reducer(event.detail.action)
        });
    }

    for (let action in ACTION_TYPES.WINDOW) {
        window.addEventListener(action, () => {
            reducer(event.detail.action)
        });
    }
}

function reducer(action) {
    switch (action.type) {
    case ACTION_TYPES.SIDEBAR.SELECTION:
    case ACTION_TYPES.SIDEBAR.UNSELECT:
        state.selection = selection(action);
        break;
    case ACTION_TYPES.SIDEBAR.FAV_CLICKED:
    case ACTION_TYPES.SIDEBAR.SEARCH_CLICKED:
        state.sidebar = sidebar(action);
        break;
    case ACTION_TYPES.SIDEBAR.TOGGLE_FAVOURITE:
    case ACTION_TYPES.SIDEBAR.QUANDL_RESPONSE:
        state.favourites = favourites(action);
        break;
    case ACTION_TYPES.WINDOW.TOGGLE_COMPACT:
    case ACTION_TYPES.WINDOW.RESTORE:
    case ACTION_TYPES.WINDOW.CLOSE:
        state.window = windowState(action);
        break;
    default:
        break;
    }
    console.log(state);
}

function selection(action) {
    switch (action.type) {
    case ACTION_TYPES.SIDEBAR.SELECTION:
        return {
            code: action.code,
            name: action.name
        };
    case ACTION_TYPES.SIDEBAR.UNSELECT:
        return {};
    default:
        return state;
    }
}

function sidebar(action) {
    switch (action.type) {
    case ACTION_TYPES.SIDEBAR.FAV_CLICKED:
        return {
            showFavourites: true
        };
    case ACTION_TYPES.SIDEBAR.SEARCH_CLICKED:
        return {
            showSearch: true
        };
    default:
        return state;
    }
}

function favourites(action) {
    let newState;
    let index;

    switch (action.type) {
    case ACTION_TYPES.SIDEBAR.TOGGLE_FAVOURITE:
        index = state.favourites.codes.indexOf(action.code);
        newState = {
            codes: [...state.favourites.codes],
            names: state.favourites.names
        };

        if (index >= 0) {
            newState.codes.splice(index, 1);
            delete newState.names[action.code];
        } else {
            newState.codes.push(action.code);
        }

        return newState;
    case ACTION_TYPES.SIDEBAR.QUANDL_RESPONSE:
        newState = {
            codes: [...state.favourites.codes],
            names: state.favourites.names
        }
        newState.names[action.code] = action.name;
        return newState;
    default:
        return state;
    }
}

function windowState(action) {
    switch (action.type) {
    case ACTION_TYPES.WINDOW.TOGGLE_COMPACT:
        return {
            isMaximused: state.window.isMaximised,
            isCompact: action.state
        };
    case ACTION_TYPES.WINDOW.MAXIMIZE:
        return {
            isMaximused: true,
            isCompact: state.window.isCompact
        };
    case ACTION_TYPES.WINDOW.RESTORE:
        return {
            isMaximused: false,
            isCompact: state.window.isCompact
        };
    case ACTION_TYPES.WINDOW.CLOSE:
    default:
        return state;
    }
}
