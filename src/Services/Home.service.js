import axios from "../Ultis/Axios/Axios.default";

function getFigureDataAPI() {
    return axios.get('/stats/getBasicStats');
}

function getPercentageDataAPI() {
    return axios.get('/stats/getPercentageStats');
}

export { getFigureDataAPI, getPercentageDataAPI };