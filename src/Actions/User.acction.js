import {signIn, getUserInfo, getUserList} from '../Services/User.service';
import { history } from '../Ultis/history/history';

export const sendLogIn = (username, password) => {
    return (dispatch) => {
        dispatch(request());
        signIn(username, password).then((res) => {
            if(res.data.code === '101')
            {// thành công
                dispatch(finished(1, res.data.message));
                dispatch(udpateUser(res.data.data.user));
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
    function udpateUser(user) {
        return {
            type: "USER_UPDATE",
            user,
        };
    }
}

export const sendUpdateInfo = (username, password) => {
    return (dispatch) => {
        getUserInfo().then((res) => {
            console.log(res);
            if(res.data.length > 0) {
                dispatch(udpateUser(res.data[0]));
            }
        }).catch(err=> {
            alert("Server gặp sự cố");
            localStorage.clear();
            // dispatch(udpateUser(null, ''));
            history.push('/login');
        })
    }

    function udpateUser(user) {
        return {
            type: "USER_UPDATE",
            user,
        };
    }
}

export const getPersonalList = (take, page, queryName, account_status) => {
    return (dispatch) => {
        getUserList(take, page, queryName, account_status).then((res) => {
            if(res.data.code === '200') {
                dispatch(udpatePersonalList(res.data.data));
            }            
        }).catch(err=> {
            alert("Server gặp sự cố\n" + err);
        })
    }

    function udpatePersonalList(list) {
        return {
            type: "PERSONAL_LIST_UDPATE",
            list,
        };
    }
}
