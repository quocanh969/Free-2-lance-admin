import { history } from '../Ultis/history/history';
import { addNewTagAPI, getAllTagsAPI, getTagDetailsAPI, setTagStatusAPI, updateTagAPI } from '../Services/Tag.service';
import Swal from 'sweetalert2';

export const getTags = (page, take, isAsc, queryName) => {
    return (dispatch) => {
        dispatch(requestTagsList());
        getAllTagsAPI(page, take, isAsc, queryName).then(res => {
            if (res.data.code === '200') {
                let list = res.data.data.tagsList;
                let currentPage = res.data.data.page;
                let total = res.data.data.total;
                dispatch(updateTagsList(list, total, currentPage));
            }
        })
    }

    function updateTagsList(list, total, currentPage) {
        return {
            type: 'TAG_LIST_UPDATE',
            list,
            total,
            currentPage,
        }
    }

    function requestTagsList() {
        return {
            type: 'TAG_LIST_REQUEST',
        }
    }
}

export const getDetails = (id) => {
    return (dispatch) => {
        getTagDetailsAPI(id).then((res) => {
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
    function updateState(tag) {
        return {
            type: "TAG_STATE_UPDATE",
            tag,
        };
    }
}

export const sendUpdateInfo = (id, updates) => {
    return (dispatch) => {
        dispatch(submitForm());
        updateTagAPI(id, updates).then(res => {
            if (res.data.code === '202') {
                getTagDetailsAPI(id).then(updated => {
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
    function updateState(tag) {
        return {
            type: "TAG_STATE_UPDATE",
            tag,
        };
    }
    
    function submitForm() {
        return {
            type: "SUBMIT_FORM",
        }
    }
}

export const addNewTag = (name) => {
    return (dispatch) => {        
        dispatch(submitForm());
        addNewTagAPI(name).then(res => {
            if (res.data.code = '201') {
                Swal.fire({
                    title: "Thêm nhãn mới thành công",
                    text: "Ấn OK để đóng cửa sổ",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok!",
                });
                dispatch(resetForm());
            } else {
                Swal.fire({
                    title: "Thêm nhãn mới thất bại",
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