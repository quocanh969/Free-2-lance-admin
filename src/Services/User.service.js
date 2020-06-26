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

function getUserList(take, page, queryName, account_status) {
    return axios.post('users/getClientUsersList/0',{
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

export {signIn, getUserInfo, getUserList, setUserStatus}