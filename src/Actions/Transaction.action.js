import { history } from '../Ultis/history/history';
import { getTransactionList } from '../Services/Transaction.service';

export const loadTransactionList = (page, take, id_user, id_status, id_job) => {
    return (dispatch) => {
        dispatch(requestTransactionList());
        getTransactionList(page, take, id_user, id_status, id_job).then((res) => {
            if (res.data.code === '200') {
                dispatch(updateTransactionList(res.data.data.list, res.data.data.total, res.data.data.page));
            }
        }).catch(err => {
            alert("Server gặp sự cố\n" + err);
        })
    }

    function updateTransactionList(list, total, page) {
        return {
            type: "USER_TRANSACTION_LIST_UDPATE",
            list,
            total,
            page,
        };
    }

    function requestTransactionList() {
        return {
            type: "USER_TRANSACTION_LIST_REQUEST",
        };
    }
}