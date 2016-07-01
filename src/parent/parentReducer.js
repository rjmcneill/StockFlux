import ACTION_TYPES from './actionTypes.js';
import childReducers from '../child/reducers/reducers.js';

function parentReducer(state = {}, action) {

    switch (action.type) {

    case ACTION_TYPES.CHILD_CLOSED: {
        const newState = Object.assign({}, state);
        delete newState[action.windowId];
        return newState;
    }
    case ACTION_TYPES.INITIALISE_STATE: {
        return state;
    }

    // If it isn't one of the above actions, it an action relating
    // to the children, let their reducers handle the actions
    default: {
        const childState = state[action.windowId];
        let newState = {};

        if (childState) {
            newState = Object.assign({}, state, {
                [action.windowId]: childReducers(childState, action)
            });
        } else {
            newState = Object.assign({}, state, {
                [action.windowId]: childReducers({}, action)
            });
        }

        return newState;
    }

    }

}

export default parentReducer;
