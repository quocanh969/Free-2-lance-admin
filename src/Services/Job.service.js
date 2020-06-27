import axios from "../Ultis/Axios/Axios.default"

function getJobList(page, take, query, ) {
    return axios.post('jobs/getJobsList',{
            take,
            page,
            isASC: 1,
            query,
        })
}

export {getJobList}