import axios from "../Ultis/Axios/Axios.default";

function getAllTagsAPI(page, take, isASC, queryName) {
    return axios.post('/tags/getTags', {
        page,
        take,
        isASC,
        queryName,
        status: 2,
    });
}

function getTagDetailsAPI(id) {
    return axios.get(`/tags/getTagById/${id}`);
}

function addNewTagAPI(name) {
    return axios.post(`/tags/addNewTag`, {
        name,
    });
}

function updateTagAPI(id, updates) {
    let body = {
        name: '',
        status: null
    };
    for (let i = 0; i < updates.length; i++) {
        body[updates[i].field] = updates[i].value;
    }
    return axios.put(`/tags/updateTagById/${id}`, {
        name: body.name,
        status: body.status,
    })
}

function setTagStatusAPI(id, status) {
    return axios.put(`/tags/setTagStatusById/${id}`, {
        status
    })
}

export { getAllTagsAPI, getTagDetailsAPI, addNewTagAPI, updateTagAPI, setTagStatusAPI };