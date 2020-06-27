import axios from "../Ultis/Axios/Axios.default"

function getEmployeeList(page, take, queryName) {
    return axios.post('users/getEmployeesList',{
            take,
            page,
            queryName,
            isManager: 0,
        })
}

function addNewEmployee(username, tel, fullname) {
    return axios.post('users/addEmployee', {
        username,
        password: 'admin123',
        tel,
        fullname,
    });
}

function resetEmployeePW(id_user) {
    return axios.put('users/resetPassword/' + id_user);
}

function removeEmployee(id_user) {
    return axios.get('users/deleteEmployee/' + id_user);
}

export {getEmployeeList, addNewEmployee, resetEmployeePW, removeEmployee}