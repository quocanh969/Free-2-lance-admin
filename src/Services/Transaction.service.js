import axios from "../Ultis/Axios/Axios.default";

function getTransactionList(page, take, id_user, id_status, id_job) {
    return axios.post('/users/getTransactionForEmployee', {
        take,
        page,
        id: id_user, 
        id_status,
        id_job: id_job,
    });
}

function payMoneyForEmployee(id_transaction) {
    return axios.post('/users/getPaymentFromJob', {
        id_transaction,
    });
}

function getPaymentList(page, take, queryName, status, isASC) {
    return axios.post('/topics/getTopics', {
        take,
        page,
        queryName,
        status,
        isASC,
    });
}

function getRefundForEmployer(id_applicant, id_transaction, amount, refundPercentage, leftover, reason) {
    return axios.post('/users/getRefundForEmployer', {
        id_applicant, 
        id_transaction, 
        amount, 
        refundPercentage, 
        leftover, 
        reason,
    });
}

export {getTransactionList, payMoneyForEmployee, getRefundForEmployer}