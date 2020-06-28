import axios from "../Ultis/Axios/Axios.default"

function getReportList(page, take, status, queryName) {
    return axios.post('reports/getReportsList',{
            take,
            page,
            status,
            queryName,
        })
}

function setReportStatus(id_report, status, solution) {
    return axios.post('reports/setReportStatus',{
            id_report, 
            status, 
            solution,
        })
}

export {getReportList, setReportStatus}