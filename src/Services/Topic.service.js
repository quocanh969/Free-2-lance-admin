import axios from "../Ultis/Axios/Axios.default";

function getTopicsList(page, take, queryName, status) {
    return axios.post('/topics/getTopics', {
        take,
        page,
        queryName,
        status,
    });
}

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
    let temp = {take, page, queryName, account_status};
    console.log(temp);
    return axios.post('users/getClientUsersList/0',{
        query: {
            take,
            page,
            queryName,
            account_status,
        }
    })
}
export {getTopicsList}