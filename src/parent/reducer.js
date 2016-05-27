// import { combineReducers } from 'redux';
import { CHILD_CHANGE, CHILD_CONNECT } from './actions';
import configureStore from '../child/store/configureStore';

function children(state = { childWindows: [], childStates: {} }, action) {
    switch (action.type) {
    case CHILD_CONNECT:
        return Object.assign({}, state, {
            childWindows: [...state.childWindows, action.uuid],
            childStates: Object.assign({}, state.childStates, {
                [action.uuid]: configureStore().getState()
            })
        });
    case CHILD_CHANGE:
        return Object.assign({}, state, {
            childStates: Object.assign({}, state.childStates, {
                [action.uuid]: action.state
            })
        });
    default:
        return state;
    }
}

export default children;
