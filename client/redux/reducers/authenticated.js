const defaultState = {
    authenticated: false
}

function authenticated(state = defaultState, action) {
    switch (action.type) {
        case 'CHANGE_AUTH':
            return {
                ...state,
                authenticated: !authenticated
            }
        default:
            return state
    }
}

export default authenticated;