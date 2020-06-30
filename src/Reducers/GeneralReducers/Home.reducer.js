import Home from "../../Components/Home";

const initState = {
    percentageData: [],
    figureData: [],
    annualJobsChartData: null,
    annualUsersChartData: null,
    pendingReports: 0,
}

const HomeReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_FIGURE_DATA': {
            return {
                ...state,
                figureData: action.figureData,
            }
        }
        case 'UPDATE_PERCENTAGE_DATA': {
            return {
                ...state,
                percentageData: action.percentageData,
            }
        }
        case 'UPDATE_ANNUAL_JOBS_CHART_DATA': {
            return {
                ...state,
                annualJobsChartData: action.annualJobsChartData,
            }
        }
        case 'UPDATE_ANNUAL_USERS_CHART_DATA': {
            return {
                ...state,
                annualUsersChartData: action.annualUsersChartData,
            }
        }
        case 'UPDATE_PENDING_REPORTS_DATA': {
            return {
                ...state,
                pendingReports: action.pendingReports,
            }
        }
        default: return state;
    }
}

export default HomeReducer;
