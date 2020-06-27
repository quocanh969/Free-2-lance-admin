import { getJobList } from "../Services/Job.service";

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

