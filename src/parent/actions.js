
import ACTION_TYPES from './actionTypes.js';

export function initialiseState() {
    return {
        type: ACTION_TYPES.INITIALISE_STATE
    };
}

export function childClosed(windowId) {
    return {
        type: ACTION_TYPES.CHILD_CLOSED,
        windowId
    };
}
