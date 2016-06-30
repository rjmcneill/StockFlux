import ACTION_TYPES from './actionTypes.js';
import childReducer from '../child/reducers/reducers.js';

function parentReducer(state = {}, action) {

    switch(action.type) {

        // This action is needed to allow persisting of state
        // It ensures that the loaded state is assigned to the
        // new windowIds rather than the previous ids
        case ACTION_TYPES.INITIALISE_STATE: {
            let newState = {};
            const previousState = Object.assign({}, state);
            let key = 0;

            for (let childWindow in state) {
                newState[key] = previousState[childWindow];
                key++;
            }

            return newState;
        }

        case ACTION_TYPES.CHILD_CLOSED: {
            // const previousState = Object.assign({}, state, {
            //     [action.windowId]: undefined
            // });
            // previousState[action.windowId] = undefined;  // This will cause Object.assign to ignore this property
            const newState = Object.assign({}, state);
            // console.log('deleting:', action.windowId, newState[action.windowId]);
            console.log(action.windowId);
            delete newState[action.windowId];
            console.log(newState);
            // return state;
            return newState;
        }
    }

    if (action.windowId === null) {
        return state;
    }

    const childState = state[action.windowId]
    if (childState) {
        console.log('CR with state');
        return Object.assign({}, state, {
            [action.windowId]: childReducer(childState, action)
        });
    } else {
        console.log('CR without state')
        return Object.assign({}, state, {
            [action.windowId]: childReducer({}, action)
        });
    }
}

export default parentReducer;
