// import { combineReducers } from 'redux';
import { CHILD_CHANGE, CHILD_CONNECT } from './actions';

function children(state = { childWindows: [], childStores: {} }, action) {
    switch (action.type) {
    case CHILD_CONNECT:
        return Object.assign({}, state, {
            childWindows: [...state.childWindows, state.uuid],
            childStores: Object.assign({}, state.childStores)
        });
    case CHILD_CHANGE:
        // return { children: state.slice(0, action.index).concat(action.newState, state.slice(action.index + 1)) };
    default:
        return state;
    }
}

export default children;
