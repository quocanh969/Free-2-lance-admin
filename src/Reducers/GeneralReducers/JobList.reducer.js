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
        default: return state;
    }
}

export default JobsListReducer;