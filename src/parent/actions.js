export const CHILD_CONNECT = 'CHILD_CONNECT';
export const CHILD_CHANGE = 'CHILD_CHANGE';

export function childConnect(uuid) {
    return {
        type: CHILD_CONNECT,
        uuid
    };
}

export function childChange(state, uuid) {
    return {
        type: CHILD_CHANGE,
        state,
        uuid
    };
}
