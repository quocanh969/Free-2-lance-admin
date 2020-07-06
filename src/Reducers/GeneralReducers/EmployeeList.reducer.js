const initState = {    
    employees: [],
    currentEmployeePage: 0,
    totalEmployee: 0,
}

const EmployeeListReducer = (state = initState, action) => {
    switch(action.type)
    {
        case 'EMPLOYEE_LIST_REQUEST':
            return {
                ...state,
                totalEmployee: -1,
            }; 
        case 'EMPLOYEE_LIST_UDPATE':
            return {
                ...state,
                employees: action.list,
                totalEmployee: action.total,
                currentEmployeePage: action.page,
            };      
        default: return state;
    }
}

export default EmployeeListReducer;