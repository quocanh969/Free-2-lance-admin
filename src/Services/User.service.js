import axios from "../Ultis/Axios/Axios.default"

export const signIn = (username, password) => {
    axios.post('login',
    {
        username,
        password,
    })
}