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
    return axios.get('users/getClientUsersList/0',{
        query: {
            take,
            page,
            queryName,
            account_status,
        }
    })
}
export {signIn, getUserInfo, getUserList}