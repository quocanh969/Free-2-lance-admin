const initState = {
    user: null,
    token: '',
}

const SignInReducer = (state = initState, action) => {
    switch(action.type)
    {
        case 'USER_LOG_OUT':
            return initState;
        default: return state;
    }
}

export default SignInReducer;