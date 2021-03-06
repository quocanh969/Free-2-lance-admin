const initState = {
    userInfo: null,
    isChangingUserStatus: false,
    isRejectingUserIdentity: false,

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
        case 'USER_DETAIL_UDPATE_REQUEST':
            return {
                ...state,
                isChangingUserStatus: true,
            };
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
                isChangingUserStatus: false,
            };
        case 'USER_DETAIL_IDENTITY_REJECT_REQUEST':
            return {
                ...state,
                isRejectingUserIdentity: true,
            };
        case 'USER_DETAIL_IDENTITY_REJECT':
            let t = state.userInfo;
            t.personal.portrait = null;
            t.personal.frontIdPaper = null;
            t.personal.backIdPaper = null;
            return {
                ...state,
                userInfo: t,
                isRejectingUserIdentity: false,
            };
        case 'USER_DETAIL_JOB_LIST_REQUEST':
            return {
                ...state,
                totalJob: -1,
            }; 
        case 'USER_DETAIL_JOB_LIST_UDPATE':
            return {
                ...state,
                jobList: action.list,
                totalJob: action.total,
                currentJob: action.page,
            };
        case 'USER_DETAIL_TASK_LIST_REQUEST':
            return {
                ...state,
                totalTask: -1,
            };
        case 'USER_DETAIL_TASK_LIST_UDPATE':
            return {
                ...state,
                taskList: action.list,
                totalTask: action.total,
                currentTask: action.page,
            };
        case 'USER_TRANSACTION_LIST_REQUEST':
            return {
                ...state,
                totalTransaction: -1,
            };
        case 'USER_TRANSACTION_LIST_UDPATE':
            return {
                ...state,
                transaction: action.list,
                totalTransaction: action.total,
                currentTransactionPage: action.page,
            };
        case 'USER_PAYMENT_LIST_REQUEST':
            return {
                ...state,
                totalPayment: -1,
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