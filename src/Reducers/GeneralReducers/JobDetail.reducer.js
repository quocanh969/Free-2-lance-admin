const initState = {
    job: null,

    isChangingStt: false,

    applicants: [],
    totalApplicants: 0,
    currentApplicant: 0,
}

const JobDetailReducer = (state = initState, action) => {
    switch(action.type)
    {
        case 'JOBS_DETAIL_UDPATE':
            return {
                ...state,
                job: action.job,
            };
        case 'JOBS_DETAIL_STATUS_REQUEST':
            return {
                ...state,
                isChangingStt: true,
            };   
        case 'JOB_DETAIL_STATUS_UDPATE':
            let temp = state.job;
            temp.id_status = action.id_status;
            return {
                ...state,
                job: temp,
                isChangingStt: false,
            };
        case 'JOBS_LIST_APPLICANTS_REQUEST':
            return {
                ...state,
                totalApplicants: -1,
            };
        case 'JOBS_LIST_APPLICANTS_UDPATE':
            return {
                ...state,
                applicants: action.list,
                totalApplicants: action.total,
                currentApplicant: action.page,
            };
        default: return state;
    }
}

export default JobDetailReducer;