import { history } from '../Ultis/history/history';
import { getFigureDataAPI, getPercentageDataAPI, getAnnualJobsChartDataAPI, getAnnualUsersChartDataAPI, getPendingReportsAPI } from '../Services/Home.service';

export const getFigureData = () => {
    return (dispatch) => {
        getFigureDataAPI().then(res => {
            if (res.data.code === '200') {
                dispatch(updateState(res.data.data));
            } else {
                console.log(res.data);
            }
        }).catch(err => {
            alert(`Lỗi hệ thống\n` + err);
        })
    }
    function updateState(figureData) {
        return {
            type: 'UPDATE_FIGURE_DATA',
            figureData,
        }
    }
}

export const getPercentageData = () => {
    return (dispatch) => {
        getPercentageDataAPI().then(res => {
            if (res.data.code === '200') {
                dispatch(updateState(res.data.data));
            } else {
                console.log(res.data);
            }
        }).catch(err => {
            alert(`Lỗi hệ thống\n` + err);
        })
    }
    function updateState(percentageData) {
        return {
            type: 'UPDATE_PERCENTAGE_DATA',
            percentageData,
        }
    }
}

export const getAnnualJobsChartData = () => {
    return (dispatch) => {
        getAnnualJobsChartDataAPI().then(res => {
            if (res.data.code === '200') {
                dispatch(updateState(res.data.data));
            } else {
                console.log(res.data);
            }
        }).catch(err => {
            alert(`Lỗi hệ thống\n` + err);
        })
    }
    function updateState(annualJobsChartData) {
        return {
            type: 'UPDATE_ANNUAL_JOBS_CHART_DATA',
            annualJobsChartData,
        }
    }
}

export const getAnnualUsersChartData = () => {
    return (dispatch) => {
        getAnnualUsersChartDataAPI().then(res => {
            if (res.data.code === '200') {
                dispatch(updateState(res.data.data));
            } else {
                console.log(res.data);
            }
        }).catch(err => {
            alert(`Lỗi hệ thống\n` + err);
        })
    }
    function updateState(annualUsersChartData) {
        return {
            type: 'UPDATE_ANNUAL_USERS_CHART_DATA',
            annualUsersChartData,
        }
    }
}

export const getPendingReports = () => {
    return (dispatch) => {
        getPendingReportsAPI().then(res => {
            if (res.data.code === '200') {
                dispatch(updateState(res.data.data.value));
            } else {
                console.log(res.data);
            }
        }).catch(err => {
            alert(`Lỗi hệ thống\n` + err);
        })
    }
    function updateState(pendingReports) {
        return {
            type: 'UPDATE_PENDING_REPORTS_DATA',
            pendingReports,
        }
    }
}