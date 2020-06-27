import axios from "../Ultis/Axios/Axios.default"

function getJobList(page, take, query) {
    return axios.post('jobs/getJobsList',{
            take,
            page,
            isASC: 1,
            query,
        })
}

function getJobDetail(id_job) {
    return axios.get('jobs/getJobById/'+id_job);
}

function setJobStatus(id_job, id_status) {
    return axios.put('jobs/setJobStatus', {
        id_job,
        id_status,
    })
}

function getApplicantsByJobId(page, take, id_job, id_status) {
    return axios.post('applicants/getByJobId', {
        page,
        take,
        isASC: 1,
        id: id_job,
        id_status,
    });
}
export {getJobList, getJobDetail, setJobStatus, getApplicantsByJobId}