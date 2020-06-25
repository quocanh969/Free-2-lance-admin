import signIn from '../Services/User.service';

export const signIn = (username, password) => {
    return (dispatch) => {
        dispatch(request());
        signIn.then(res => {
            if(res.code === '101')
            {// thành công
                dispatch(finished(1));
            }
            else
            {// thất bại
                dispatch(finished(-1));
            }
        }).catch(err=> {

        })
    }

    function request() {
        return {
          type: "LOGIN_REQUEST",
        };
    }
    function finished(code) {
        return {
            type: "LOGIN_FINISHED",
            code,
        };
    }
}