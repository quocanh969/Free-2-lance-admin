const initState = {
    // personal list
    jobs: [],
    currentJobPage: 0,
    totalJobPage: 0,
}

const JobsListReducer = (state = initState, action) => {
    switch(action.type)
    {
        case 'JOBS_LIST_UDPATE':
            return {
                ...state,
                jobs: action.list,
                totalJobPage: action.total,
                currentJobPage: action.page,
            }; 
        case 'JOBS_LIST_REQUEST':
            return {
                ...state,
                totalJobPage: -1,
            };     
        default: return state;
    }
}

export default JobsListReducer;