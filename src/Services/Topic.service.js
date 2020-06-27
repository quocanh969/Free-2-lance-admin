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

function updateTopic(id, updates) {
    let body = {
        name: '',
        img: '',
        status: null,
    };
    for (let i = 0; i < updates.length; i++) {
        body[updates[i].field] = updates[i].value;
    }
    // console.log(body);
    return axios.put(`/topics/updateTopicById/${id}`, {
        name: body.name,
        status: body.status,
        img: body.img,
    })
}

function addTopic(name, img) {
    return axios.post('/topics/addNewTopic', {
        name,
        img,
    })
}

function getTopicDetails(id) {
    return axios.get(`/topics/getTopicById/${id}`);
}

export { getTopicsList, setTopicStatus, updateTopic, getTopicDetails, addTopic }