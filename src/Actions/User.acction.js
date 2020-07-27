import {signIn, getUserInfo, getUserList, getUserDetail, getJobsByEmployerId, getJobsByApplicantId, setUserStatus, deleteUserIdentity} from '../Services/User.service';
import { history } from '../Ultis/history/history';
import Swal from 'sweetalert2';

export const sendLogIn = (username, password) => {
    return (dispatch) => {
        dispatch(request());
        signIn(username, password).then((res) => {
            if(res.data.code === '101')
            {// thành công
                dispatch(finished(1, res.data.message));
                dispatch(udpateUser(res.data.data.user));
                localStorage.setItem('admin_token', JSON.stringify(res.data.data.token));
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
            if(res.data.data.length > 0) {
                dispatch(udpateUser(res.data.data[0]));
            }
        }).catch(err=> {
            console.log(err);
            alert("Server gặp sự cố");
            localStorage.clear();
            // dispatch(udpateUser(null, ''));
            // history.push('/login');
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
        dispatch(requestPersonalList());
        getUserList(take, page, queryName, account_status, 0).then((res) => {
            if(res.data.code === '200') {
                dispatch(udpatePersonalList(res.data.data.usersList, res.data.data.total, res.data.data.page));
            }            
        }).catch(err=> {
            alert("Server gặp sự cố\n" + err);
        })
    }

    function udpatePersonalList(list, total, page) {
        return {
            type: "PERSONAL_LIST_UDPATE",
            list,
            total,
            page,
        };
    }

    function requestPersonalList() {
        return {
            type: "PERSONAL_LIST_REQUEST",
        };
    }
}

export const getBusinessList = (take, page, queryName, account_status) => {
    return (dispatch) => {
        dispatch(requestBusinessList());
        getUserList(take, page, queryName, account_status, 1).then((res) => {
            if(res.data.code === '200') {
                dispatch(udpateBusinessList(res.data.data.usersList, res.data.data.total, res.data.data.page));
            }            
        }).catch(err=> {
            alert("Server gặp sự cố");
        })
    }

    function udpateBusinessList(list, total, page) {
        return {
            type: "BUSINESS_LIST_UDPATE",
            list,
            total,
            page,
        };
    }

    function requestBusinessList() {
        return {
            type: "BUSINESS_LIST_REQUEST",
        };
    }
}

export const loadUserDetail = (id_user) => {
    return (dispatch) => {
        getUserDetail(id_user).then((res) => {
            if(res.data.code === '200') {
                dispatch(udpateUserDetail(res.data.data));
            }
        }).catch(err=> {
            alert("Server gặp sự cố");
        })
    }

    function udpateUserDetail(user) {
        return {
            type: "USER_DETAIL_UDPATE",
            user,
        };
    }
}

export const loadJobsByEmployer = (page, take, queryName, status, id_user) => {
    return (dispatch) => {
        dispatch(requestJobList());
        getJobsByEmployerId(page, take, queryName, status, id_user).then((res) => {
            if(res.data.code === '200')
            {
                dispatch(updateJobList(res.data.data.jobsList, res.data.data.total, res.data.data.page));
            }
        }).catch(err=> {
            alert("Server gặp sự cố");
        })
    }

    function updateJobList(list,total,page) {
        return {
            type: "USER_DETAIL_JOB_LIST_UDPATE",
            list,
            total,
            page,
        };
    }

    function requestJobList() {
        return {
            type: "USER_DETAIL_JOB_LIST_REQUEST",
        };
    }
}

export const loadJobsByApplicant = (page, take, queryName, status, id_user) => {
    return (dispatch) => {
        dispatch(requestTaskList());
        getJobsByApplicantId(page, take, queryName, status, id_user).then((res) => {
            if(res.data.code === '200')
            {
                dispatch(updateTaskList(res.data.data.jobsList, res.data.data.total, res.data.data.page));
            }            
        }).catch(err=> {
        })
    }
    
    function updateTaskList(list,total,page) {
        return {
            type: "USER_DETAIL_TASK_LIST_UDPATE",
            list,
            total,
            page,
        };
    }

    function requestTaskList() {
        return {
            type: "USER_DETAIL_TASK_LIST_REQUEST",
        };
    }
}

export const udpateUserStatus = (id_user, newStatus) => {
    return (dispatch) => {
        setUserStatus(id_user, newStatus).then((res) => {
            if(res.data.code === '106') {
                dispatch(udpateUserStatus(newStatus));
                Swal.fire({
                    text: 'Cập nhật trạng thái thành công',
                    icon: 'success',
                });
            }     
            else {
                Swal.fire({
                    text: 'Xóa tài liệu thất bại',
                    icon: 'error',
                });
            }       
        }).catch(err=> {
            Swal.fire({
                text: 'Server gặp sự cố',
                icon: 'error',
            });
        })
    }
    
    function udpateUserStatus(newStatus) {
        return {
            type: "USER_DETAIL_STATUS_UDPATE",
            newStatus,
        };
    }

    function request() {
        return {
            type: "USER_DETAIL_UDPATE_REQUEST",
        };
    }
}

export const rejectUserIdentity = (id_user) => {
    return (dispatch) => {
        deleteUserIdentity(id_user).then((res) => {
            if(res.data.code === '106') {
                dispatch(rejectIdentity());
                Swal.fire({
                    text: 'Xóa tài liệu thành công',
                    icon: 'success',
                });
            }            
            else {
                Swal.fire({
                    text: 'Xóa tài liệu thất bại',
                    icon: 'error',
                });
            }
        }).catch(err=> {
            Swal.fire({
                text: 'Server gặp sự cố',
                icon: 'error',
            });
        })
    }
    
    function rejectIdentity() {
        return {
            type: "USER_DETAIL_IDENTITY_REJECT",
        };
    }
}