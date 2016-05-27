export const CHILD_CHANGE = 'CHILD_CHANGE';
export const CHILD_CONNECT = 'CHILD_CONNECT';

export function childChange(state, uuid) {
    return {
        type: CHILD_CHANGE,
        newState: state,
        uuid
    };
}

export function childConnect(uuid) {
    return {
        type: CHILD_CONNECT,
        uuid
    };
}
