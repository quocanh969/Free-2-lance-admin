import axios from "../Ultis/Axios/Axios.default";

function getTopicsList(page, take, queryName, status, isASC) {
    return axios.post('/topics/getTopics', {
        take,
        page,
        queryName,
        status,
        isASC,
    });
}

function setTopicStatus(id, status) {
    return axios.put(`/topics/setTopicStatusById/${id}`, {
        status,
    })
}

export { getTopicsList, setTopicStatus }