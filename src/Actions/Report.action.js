import { getReportList, getJobReportsList } from "../Services/Report.service";

export const loadReportList = (page, take, status, queryName) => {
    return (dispatch) => {
        dispatch(requestReportList());
        getReportList(page, take, status, queryName).then((res) => {
            if(res.data.code === '200') {
                dispatch(updateReportList(res.data.data.list, res.data.data.total, res.data.data.page));
            }            
        }).catch(err=> {
            alert('Server gặp sự cố');
        })
    }
    
    function updateReportList(list,total,page) {
        return {
            type: "REPORT_LIST_UDPATE",
            list,
            total,
            page,
        };
    }

    function requestReportList() {
        return {
            type: "REPORT_LIST_REQUEST",
        };
    }
}

export const loadJobReportList = (page, take, status, queryName) => {
    return (dispatch) => {
        dispatch(requestJobReportList());
        getJobReportsList(page, take, status, queryName).then((res) => {
            if(res.data.code === '200') {
                dispatch(updateJobReportList(res.data.data.list, res.data.data.total, res.data.data.page));
            }            
        }).catch(err=> {
            alert('Server gặp sự cố');
        })
    }
    
    function updateJobReportList(list,total,page) {
        return {
            type: "JOB_REPORT_LIST_UDPATE",
            list,
            total,
            page,
        };
    }

    function requestJobReportList() {
        return {
            type: "JOB_REPORT_LIST_REQUEST",
        };
    }
}