export function notifyParent(action) {
    var e = new CustomEvent(action.type, {
        detail: {
            action: action,
            window: window.name
        }
    });
    window.opener.dispatchEvent(e);
}