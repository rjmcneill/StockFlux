
function actionMiddleware() {
    return () => (next) => (action) => {
        return next(action);
        // return next(Object.assign({}, action, {
        //     windowId: window.name
        // }));
    }
}

export default actionMiddleware;