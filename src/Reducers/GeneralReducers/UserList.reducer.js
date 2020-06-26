const initState = {
    // personal list
    personal: [],
    personalCurrentPage: 0,
    totalPersnal: 0,

    bussiness: [],
}

const UserListReducer = (state = initState, action) => {
    switch(action.type)
    {
        case 'PERSONAL_LIST_UDPATE':
            return {
                ...state,
                personal: action.list,
            };        
        default: return state;
    }
}

export default UserListReducer;