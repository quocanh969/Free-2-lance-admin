import { getJobList, getJobDetail, getApplicantsByJobId, setJobStatus } from "../Services/Job.service";
import Swal from "sweetalert2";

export const loadJobList = (page, take, query) => {
    return (dispatch) => {
        dispatch(requestJobList());
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

    function requestJobList() {
        return {
            type: "JOBS_LIST_REQUEST",
        };
    }
}

export const loadJobDetail = (id_job) => {
    return (dispatch) => {
        getJobDetail(id_job).then((res) => {
            if(res.data.code === '200') {
                dispatch(updateJobDetail(res.data.data));
                if(res.data.data.id_status === 1) { // đang tuyển
                    dispatch(loadApplicantsByJobId(1, 8, id_job, 0));
                }
                else { // đang thực hiện hoặc đã hoàn thành
                    dispatch(loadApplicantsByJobId(1, 8, id_job, 1));
                }
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
        dispatch(request());
        setJobStatus(id_job, id_status).then((res) => {
            if(res.data.code === '202') {
                dispatch(udpateJobStatus(id_status));                
                Swal.fire({
                    text: 'Thay đổi thành công',
                    icon: 'success',
                });  
            }            
            else {                
                Swal.fire({
                    text: 'Thay đổi thất bại',
                    icon: 'error',
                });  
            }
        }).catch(err=> {
            Swal.fire({
                text: 'Server gặp vấn đề',
                icon: 'success',
            });  
        })
    }
    
    function udpateJobStatus(id_status) {
        return {
            type: "JOB_DETAIL_STATUS_UDPATE",
            id_status,
        };
    }

    function request() {
        return {
            type: 'JOBS_DETAIL_STATUS_REQUEST',
        }
    }
}

export const loadApplicantsByJobId = (page, take, id_job, id_status) => {
    return (dispatch) => {
        dispatch(requestApplicantByJobId());
        getApplicantsByJobId(page, take, id_job, id_status).then((res) => {
            if(res.data.code === '200') {
                dispatch(updateApplicantByJobId(res.data.data.applicantsList, res.data.data.total, res.data.data.page));
            }            
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

    function requestApplicantByJobId() {
        return {
            type: "JOBS_LIST_APPLICANTS_REQUEST",
        };
    }
}