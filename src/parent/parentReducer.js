import ACTION_TYPES from './actionTypes.js';
import childReducer from '../child/reducers/reducers.js';

function parentReducer(state = {}, action) {

    switch (action.type) {

    // This action is needed to allow persisting of state
    // It ensures that the loaded state is assigned to the
    // new windowIds rather than the previous ids
    case ACTION_TYPES.INITIALISE_STATE: {
        const newState = {};
        const previousState = Object.assign({}, state);
        let key = 0;

        Object.keys(previousState).forEach((previousKey) => {
            newState[key] = previousState[previousKey];
            key++;
        });

        return newState;
    }

    case ACTION_TYPES.CHILD_CLOSED: {
        const newState = Object.assign({}, state);
        delete newState[action.windowId];
        return newState;
    }

    // If it isn't one of the above actions, it an action relating
    // to the children, let their reducers handle the actions
    default: {
        if (action.windowId === null) {
            return state;
        }

        const childState = state[action.windowId];
        let newState = {};

        if (childState) {
            newState = Object.assign({}, state, {
                [action.windowId]: childReducer(childState, action)
            });
        } else {
            newState = Object.assign({}, state, {
                [action.windowId]: childReducer({}, action)
            });
        }

        return newState;
    }

    }

}

export default parentReducer;
