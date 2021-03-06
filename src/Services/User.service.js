import axios from "../Ultis/Axios/Axios.default";

function signIn(username, password) {
    return axios.post('login',
    {
        username,
        password,
    });
}

function getUserInfo() {
    return axios.get('users/');
}

function changeUserInfo(fullname, tel) {
    return axios.put('users/updateProfile',{
        fullname,
        tel
    })
}

function changeUserPassword(oldPassword, newPassword) {
    return axios.put('users/changePassword',{
        oldPassword,
        newPassword
    })
}

function getUserList(take, page, queryName, account_status, type) {
    return axios.post('users/getClientUsersList/' + type,{
            take,
            page,
            queryName,
            account_status,
        })
}

function setUserStatus(id_user, account_status) {
    return axios.put('users/setClientUserStatus',{
        id_user,
        account_status,
    })
}

function deleteUserIdentity(id_user) {
    return axios.put('users/rejectVerificationProposal',{
        id_user,
    })
}

function getUserDetail(id_user) {
    return axios.get('users/getClientUserDetails/' + id_user)
}

function getJobsByEmployerId(page, take, queryName, status, employer) {
    return axios.post('jobs/getJobsByEmployer/' + employer, {
        page,
        take,
        isASC: 1,
        queryName,
        status,
    })
}

function getJobsByApplicantId(page, take, queryName, status, employer) {
    return axios.post('jobs/getJobsByApplicant/' + employer, {
        page,
        take,
        isASC: 1,
        queryName,
        status,
    })
}

export {signIn, getUserInfo, changeUserInfo, changeUserPassword, getUserList, setUserStatus, getUserDetail, getJobsByEmployerId, getJobsByApplicantId, deleteUserIdentity}