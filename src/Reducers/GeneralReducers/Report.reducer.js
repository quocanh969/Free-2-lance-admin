const initState = {
    reports: [],
    currentReportPage: 0,
    totalReport: 0,
}

const ReportsReducer = (state = initState, action) => {
    switch(action.type)
    {
        case 'REPORT_LIST_UDPATE':
            return {
                ...state,
                reports: action.list,
                totalReport: action.total,
                currentReportPage: action.page,
            };      
        default: return state;
    }
}

export default ReportsReducer;