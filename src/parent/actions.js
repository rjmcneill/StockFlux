export const CHILD_CONNECT = 'CHILD_CONNECT';
export const CHILD_CHANGE = 'CHILD_CHANGE';
export const CHILD_CLOSED = 'CHILD_CLOSED';

export function childConnect(id) {
    return {
        type: CHILD_CONNECT,
        id
    };
}

export function childChange(state, id) {
    return {
        type: CHILD_CHANGE,
        state,
        id
    };
}

export function childClosed(id) {
	return {
		type: CHILD_CLOSED,
		id
	};
}
