import ACTION_TYPES from '../constants/actionTypes.js';
import childReducers from '../../child/reducers/reducers.js';

function parentReducer(state = {}, action) {

    switch (action.type) {

    case ACTION_TYPES.CLOSE: {
        const newState = Object.assign({}, state);

        if (Object.keys(newState.childWindows).length > 1) {
            delete newState.childWindows[action.windowName];
        }

        return newState;
    }

    default: {
        const subString = action.type.substring(0, 5);

        // All child actions are prefaced with 'CHILD'; if the incoming
        // action is for the child, let the child reducers handle the action
        if (subString === 'CHILD') {
            const childState = state.childWindows ? state.childWindows[action.windowName] : {};
            let newState = {};

            if (childState) {
                const childWindows = Object.assign({}, state.childWindows);
                childWindows[action.windowName] = childReducers(childState, action)
                newState = Object.assign({}, state, { childWindows });
            } else {
                const childWindows = Object.assign({}, state.childWindows);
                childWindows[action.windowName] = childReducers({}, action)
                newState = Object.assign({}, state, { childWindows });
            }

            return newState;
        }

        return state;
    }

    }
}

export default parentReducer;
