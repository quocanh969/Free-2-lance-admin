const initState = {
    reports: [],
    currentReportPage: 0,
    totalReport: 0,

    jobReports: [],
    currentJobReportsPage: 0,
    totalJobReports: 0,
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
        case 'JOB_REPORT_LIST_UDPATE':
            return {
                ...state,
                jobReports: action.list,
                totalJobReports: action.total,
                currentJobReportsPage: action.page,
            };      
        default: return state;
    }
}

export default ReportsReducer;