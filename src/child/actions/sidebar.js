import { SIDEBAR as ACTION_TYPES } from '../constants/actionTypes.js';

import QuandlService from '../services/QuandlService.js';
import { notifyParent } from '../services/notifyParent.js';
const quandlService = new QuandlService();

export function searchInput(term) {
    return {
        type: ACTION_TYPES.SEARCH_INPUT,
        term
    };
}

export function selectStock(code, name) {
    const action = {
        type: ACTION_TYPES.SELECTION,
        code,
        name
    };
    notifyParent(action);
    return action;
}

export function unselectStock() {
    const action = {
        type: ACTION_TYPES.UNSELECT
    };
    notifyParent(action);
    return action;
}

export function toggleFavourite(code) {
    const action = {
        type: ACTION_TYPES.TOGGLE_FAVOURITE,
        code
    };
    notifyParent(action);
    return action;
}

export function clearSearch() {
    return {
        type: ACTION_TYPES.CLEAR_SEARCH
    };
}

function searchStarted(term) {
    return {
        type: ACTION_TYPES.SEARCH_STARTED,
        term
    };
}

export function searchFinished(term, results) {
    return {
        type: ACTION_TYPES.SEARCH_FINISHED,
        term,
        results
    };
}

export function searchError() {
    return {
        type: ACTION_TYPES.SEARCH_ERROR
    };
}

export function selectSearch() {
    const action = {
        type: ACTION_TYPES.SEARCH_CLICKED
    };
    notifyParent(action);
    return action;
}

export function selectFavourites() {
    const action = {
        type: ACTION_TYPES.FAV_CLICKED
    };
    notifyParent(action);
    return action;
}

export function quandlResponse(code, name) {
    const action = {
        type: ACTION_TYPES.QUANDL_RESPONSE,
        code,
        name
    };
    notifyParent(action);
    return action;
}

export function search(term) {
    return dispatch => {
        if (term.trim() === '') {
            dispatch(clearSearch());
        } else {
            dispatch(searchStarted(term));
            quandlService.search(term,
                results => dispatch(searchFinished(term, results)),
                () => dispatch(searchError())
            );
        }
    };
}
