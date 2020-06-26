const initState = {
    // personal list
    personal: [],
    personalCurrentPage: 0,
    totalPersnal: 0,

    business: [],
    businessCurrentPage: 0,
    totalBusiness: 0,
}

const UserListReducer = (state = initState, action) => {
    switch(action.type)
    {
        case 'PERSONAL_LIST_UDPATE':
            return {
                ...state,
                personal: action.list,
                personalCurrentPage: action.page,
                totalPersnal: action.total,
            };
        case 'BUSINESS_LIST_UDPATE':
            return {
                ...state,
                business: action.list,
                businessCurrentPage: action.page,
                totalBusiness: action.total,
            };        
        default: return state;
    }
}

export default UserListReducer;