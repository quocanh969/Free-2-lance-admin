import { getEmployeeList, addNewEmployee } from "../Services/Employee.service";

export const loadEmployeeList = (page, take, queryName) => {
    return (dispatch) => {
        getEmployeeList(page, take, queryName).then((res) => {
            if(res.data.code === '200') {
                dispatch(updateEmployeeList(res.data.data.employeesList, res.data.data.total, res.data.data.page))
            }
        }).catch(err=> {
            alert('Server gặp sự cố');
        })
    }
    
    function updateEmployeeList(list,total,page) {
        return {
            type: "EMPLOYEE_LIST_UDPATE",
            list,
            total,
            page,
        };
    }
}