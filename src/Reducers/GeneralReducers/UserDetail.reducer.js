const initState = {
    userInfo: null,

    jobList: [],
    totalJob: 0,
    currentJob: 0,

    taskList: [],
    totalTask: 0,
    currentTask: 0,

    payment: [],
    totalPayment: 0,
    currentPaymentPage: 0,

    transaction: [],
    totalTransaction: 0,
    currentTransactionPage: 0,
}

const UserDetailReducer = (state = initState, action) => {
    switch(action.type)
    {
        case 'USER_DETAIL_UDPATE':
            return {
                ...state,
                userInfo: action.user,
            };
        case 'USER_DETAIL_STATUS_UDPATE':
            let temp = state.userInfo;
            temp.personal.account_status = action.newStatus;
            return {
                ...state,
                userInfo: temp,
            }; 
        case 'USER_DETAIL_JOB_LIST_UDPATE':
            return {
                ...state,
                jobList: action.list,
                totalJob: action.total,
                currentJob: action.page,
            };
        case 'USER_DETAIL_TASK_LIST_UDPATE':
            return {
                ...state,
                taskList: action.list,
                totalTask: action.total,
                currentTask: action.page,
            };
        case 'USER_TRANSACTION_LIST_UDPATE':
            return {
                ...state,
                transaction: action.list,
                totalTransaction: action.total,
                currentTransactionPage: action.page,
            };
        case 'USER_PAYMENT_LIST_UDPATE':
            return {
                ...state,
                payment: action.list,
                totalPayment: action.total,
                currentPaymentPage: action.page,
            };
        default: return state;
    }
}

export default UserDetailReducer;