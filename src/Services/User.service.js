import axios from "../Ultis/Axios/Axios.default";

function signIn(username, password) {
    return axios.post('login',
    {
        username,
        password,
    })
}

export {signIn}