import { getJobList, getJobDetail, getApplicantsByJobId, setJobStatus } from "../Services/Job.service";

export const loadJobList = (page, take, query) => {
    return (dispatch) => {
        getJobList(page, take, query).then((res) => {
            if(res.data.code === '200') {
                dispatch(updateJobList(res.data.data.jobList, res.data.data.total, res.data.data.page))
            }
        }).catch(err=> {
            alert('Server gặp sự cố');
        })
    }
    
    function updateJobList(list,total,page) {
        return {
            type: "JOBS_LIST_UDPATE",
            list,
            total,
            page,
        };
    }
}

export const loadJobDetail = (id_job) => {
    return (dispatch) => {
        getJobDetail(id_job).then((res) => {
            if(res.data.code === '200') {
                dispatch(updateJobDetail(res.data.data));
            }
        }).catch(err=> {
            alert('Server gặp sự cố');
        })
    }
    
    function updateJobDetail(job) {
        return {
            type: "JOBS_DETAIL_UDPATE",
            job,
        };
    }
}

export const udpateJobStatus = (id_job, id_status) => {
    return (dispatch) => {
        setJobStatus(id_job, id_status).then((res) => {
            if(res.data.code === '106') {
                dispatch(udpateJobStatus(id_status));
            }            
        }).catch(err=> {
            alert('Server gặp vấn đề');
        })
    }
    
    function udpateJobStatus(id_status) {
        return {
            type: "JOB_DETAIL_STATUS_UDPATE",
            id_status,
        };
    }
}

export const loadApplicantsByJobId = (page, take, id_job, id_status) => {
    return (dispatch) => {
        getApplicantsByJobId(page, take, id_job, id_status).then((res) => {
            console.log(res);
        }).catch(err=> {
            alert('Server gặp sự cố');
        })
    }
    
    function updateApplicantByJobId(list,total,page) {
        return {
            type: "JOBS_LIST_APPLICANTS_UDPATE",
            list,
            total,
            page,
        };
    }
}