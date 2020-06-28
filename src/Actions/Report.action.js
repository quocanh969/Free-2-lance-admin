import { getReportList } from "../Services/Report.service";

export const loadReportList = (page, take, status, queryName) => {
    return (dispatch) => {
        getReportList(page, take, status, queryName).then((res) => {
            console.log(res);
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
}