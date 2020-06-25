import {signIn} from '../Services/User.service';
import { history } from '../Ultis/history/history';

export const sendLogIn = (username, password) => {
    return (dispatch) => {
        dispatch(request());
        signIn(username, password).then((res) => {
            if(res.data.code === '101')
            {// thành công
                dispatch(finished(1, res.data.message));
                dispatch(udpateUser(res.data.data.user, res.data.data.token));
                localStorage.setItem('token', JSON.stringify(res.data.data.token));
                history.push('/');
            }
            else
            {// thất bại
                dispatch(finished(-1, res.data.message));
            }
        }).catch(err=> {
            dispatch(finished(-1, 'Server gặp vấn đề'));
        })
    }

    function request() {
        return {
          type: "LOGIN_REQUEST",
        };
    }
    function finished(code, message) {
        return {
            type: "LOGIN_FINISHED",
            code,
            message,
        };
    }
    function udpateUser(user, token) {
        return {
            type: "USER_UPDATE",
            user,
            token,
        };
    }
}