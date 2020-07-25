import { history } from '../Ultis/history/history';
import { getTopicsList, getTopicDetails, updateTopic, addTopic } from '../Services/Topic.service';
import Swal from 'sweetalert2';

export const getTopics = (page, take, queryName, status, isAsc) => {
    return (dispatch) => {
        dispatch(requestTopicsList());
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
        return {
            type: "TOPIC_LIST_UPDATE",
            list,
            total,
            currentPage,
        };
    }

    function requestTopicsList() {
        return {
            type: "TOPIC_LIST_REQUEST",
        };
    }
}

export const sendUpdateInfo = (id, updates) => {
    return (dispatch) => {           
        dispatch(submitForm());
        updateTopic(id, updates).then(res => {
            if (res.data.code === '202') {
                getTopicDetails(id).then(updated => {
                    console.log(updated.data)
                    dispatch(updateState(updated.data.data));
                    Swal.fire({
                        title: "Sửa thông tin thành công",
                        text: "Ấn OK để đóng cửa sổ",
                        icon: "success",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "Ok!",
                    })
                })

            } else {
                Swal.fire({
                    title: "Sửa thông tin thất bại",
                    text: "Lỗi hệ thống",
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK!",
                });
            }
        }).catch(err => {
            alert("Server gặp sự cố\n" + err);
        })
    }
    function updateState(topic) {
        return {
            type: "TOPIC_STATE_UPDATE",
            topic,
        };
    }
    function submitForm() {
        return {
            type: "SUBMIT_FORM",
        }
    }
}

export const getDetails = (id) => {
    return (dispatch) => {
        getTopicDetails(id).then((res) => {
            if (res.data.code === '200') {
                dispatch(updateState(res.data.data));
            } else {
                console.log("response: ");
                console.log(res.data);
            }
        }).catch(err => {
            alert("Server gặp sự cố\n" + err);
        })
    }
    function updateState(topic) {
        return {
            type: "TOPIC_STATE_UPDATE",
            topic,
        };
    }
}

export const addNewTopic = (name, img) => {
    return (dispatch) => {        
        dispatch(submitForm());
        addTopic(name, img).then(res => {
            if (res.data.code = '201') {
                Swal.fire({
                    title: "Thêm chủ đề mới thành công",
                    text: "Ấn OK để đóng cửa sổ",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok!",
                });
                dispatch(resetForm());
            } else {
                Swal.fire({
                    title: "Thêm chủ đề mới thất bại",
                    text: "Lỗi hệ thống",
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK!",
                });
            }
        })
    }
    function resetForm() {
        console.log("RESET")
        return {
            type: "ADD_FORM_RESET",
        }
    }
    function submitForm() {
        return {
            type: "SUBMIT_FORM",
        }
    }
}