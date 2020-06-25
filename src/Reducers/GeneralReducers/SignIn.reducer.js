const initState = {
    sending: false,
    code: 0,
    message: '',
}

const SignInReducer = (state = initState, action) => {
    switch(action.type)
    {
        case 'LOGIN_REQUEST':
            return {
                ...state,
                sending: true,
                code: 0,
                message: '',
            };
        case 'LOGIN_FINISHED':
            console.log(action);
            return {
                ...state,
                sending: false,
                code: action.code,
                message: action.message,
            };
        default: return state;
    }
}

export default SignInReducer;