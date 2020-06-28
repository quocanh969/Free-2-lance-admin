import axios from "../Ultis/Axios/Axios.default";

function getFigureDataAPI() {
    return axios.get('/stats/getBasicStats');
}

function getPercentageDataAPI() {
    return axios.get('/stats/getPercentageStats');
}

function getAnnualJobsChartDataAPI() { 
    return axios.get('/stats/annualJobsChartData');
}

function getAnnualUsersChartDataAPI() {
    return axios.get('/stats/annualUsersChartData');
}

function getPendingReportsAPI() {
    return axios.get('/stats/getPendingReports');
}

export { getFigureDataAPI, getPercentageDataAPI, getAnnualJobsChartDataAPI, getAnnualUsersChartDataAPI, getPendingReportsAPI };