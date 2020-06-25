const initState = {
    user: null,
    token: '',
}

const AccountReducer = (state = initState, action) => {
    switch(action.type)
    {
        case 'USER_UPDATE':
            return {
                ...state,
                user: action.user,
                token: action.token,
            }
        case 'USER_LOG_OUT':
            return initState;
        default: return state;
    }
}

export default AccountReducer;