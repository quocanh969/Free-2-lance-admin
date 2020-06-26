import { history } from '../Ultis/history/history';
import { getTopicsList } from '../Services/Topic.service';

export const getTopics = (page, take, queryName, status, isAsc) => {
    return (dispatch) => {
        getTopicsList(page, take, queryName, status, isAsc).then((res) => {
            if (res.data.code === '200') {
                let topicsList = res.data.data.topicsList;
                let total = res.data.data.total;
                let currentPage = res.data.data.page;
                dispatch(updateTopicsList(topicsList, total, currentPage));
            }
        }).catch(err => {
            alert("Server gặp sự cố\n" + err);
        })
    }

    function updateTopicsList(list, total, currentPage) {
        console.log("Cur page: " + currentPage)
        return {
            type: "TOPIC_LIST_UPDATE",
            list,
            total,
            currentPage,
        };
    }
}