import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { prettierDate, prettierNumber } from '../../../Ultis/Helper/HelperFunction';
import { loadTransactionList } from '../../../Actions/Transaction.action';
import { payMoneyForEmployee } from '../../../Services/Transaction.service';

class UserTransactionComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            queryType: 0,
            queryId: '',
        }
    }

    componentWillMount() {
        this.loadTransaction(1, this.state.queryType, this.state.queryId);
    }

    loadTransaction(page, id_status, id_job) {
        let { onLoadTransactionList } = this.props;
        let { userInfo } = this.props.UserDetailReducer;
        onLoadTransactionList(page, userInfo.personal.id_user, id_status, id_job);
    }

    handleFilter(newType) {
        this.setState({ queryType: newType }, () => {
            this.loadTransaction(1, this.state.queryType, this.queryId);
        })
    }

    handlePagination(pageNum) {
        if (pageNum !== this.props.UserDetailReducer.currentTransactionPage) {
            this.loadTransaction(pageNum, this.state.queryType, this.queryId);
        }
    }

    handleSearchIdApplicant() {
        let searchStr = Number.parseInt(document.getElementById('transaction-search-input').value);
        if (searchStr === this.state.queryId) {
            return;
        }
        else {
            if (isNaN(Number.parseInt(searchStr)) === false) {
                this.setState({ queryId: searchStr }, () => {
                    this.loadTransaction(1, this.state.queryType, this.state.queryId);
                })
            }
            else {
                Swal.fire({
                    title: 'Vui lòng nhập đúng định dạng mã công việc',
                    icon: 'error',
                })
            }

        }
    }

    handlePayOne(id_transaction, end) {

        let today = new Date();
        let endDate = new Date(end);

        if ((today - endDate) / (24 * 3600 * 1000) > 3) {

            Swal.fire({
                text: "Bạn có chắc là muốn thanh toán cho công việc này",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ok, tôi đồng ý',
                cancelButtonText: 'Không, tôi đã suy nghĩ lại',
                reverseButtons: true,
            }).then((result) => {
                if (result.value) {
                    let {onRequestPayment} = this.props;
                    onRequestPayment();
                    payMoneyForEmployee(id_transaction).then(res => {
                        if (res.data.code === '200') {
                            this.loadTransaction(1, this.state.queryType, this.state.queryId);
                            Swal.fire({
                                text: 'Thanh toán thành công',
                                icon: 'success',
                            })
                        }
                        else {
                            Swal.fire({
                                text: 'Thanh toán thất bại',
                                icon: 'error',
                            })
                        }
                    }).catch(err => {
                        console.log(err);
                        Swal.fire({
                            text: 'Server kết nối có vấn đề, vui lòng thử lại sau',
                            icon: 'error',
                        })
                    })
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire({
                        text: 'Thanh toán không được thực hiện',
                        icon: 'error',
                    })
                }
                else {
                }
            })
        }
        else {
            Swal.fire({
                title: 'Bạn không thể thanh toán giao dịch này',
                text: 'Hiện tại vẫn chưa đủ 3 ngày để người dùng có thể thanh toán tiền',
                icon: 'error',
            })
        }
    }

    handlePaySelected() {
        let { transaction } = this.props.UserDetailReducer;
        let selectedArr = [];
        transaction.forEach((e, index) => {
            let input = document.getElementById('select-input-' + index);
            if (input.checked) {
                selectedArr.push(index);
            }
        })

        Swal.fire({
            text: "Bạn có chắc là muốn thanh toán cho các công việc được chọn này này",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ok, tôi đồng ý',
            cancelButtonText: 'Không, tôi đã suy nghĩ lại',
            reverseButtons: true,
        }).then((result) => {
            if (result.value) {
                let isSuccess = 1;
                let {onRequestPayment} = this.props;
                onRequestPayment();
                selectedArr.forEach((e, index) => {
                    payMoneyForEmployee(e.id_transaction).then(res => {
                        if (res.data.code === '200') {
                        }
                        else {
                            isSuccess = 0;
                        }
                    }).catch(err => {
                        console.log(err);
                        Swal.fire({
                            text: 'Server kết nối có vấn đề, vui lòng thử lại sau',
                            icon: 'error',
                        })
                    })
                })

                this.loadTransaction(1, this.state.queryType, this.state.queryId);

                if (isSuccess === 1) {
                    Swal.fire({
                        text: 'Thanh toán tất cả lựa chọn thành công',
                        icon: 'success',
                    })
                }
                else {
                    Swal.fire({
                        text: 'Thanh toán gặp lỗi trong quá trình thực hiện nên một số thanh toán không được thực hiện',
                        icon: 'warning',
                    })
                }


            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    text: 'Các thanh toán không được thực hiện',
                    icon: 'error',
                })
            }
            else {
            }
        })
    }

    handleDetail(transaction) {
        let { userInfo } = this.props.UserDetailReducer;

        let sttText = 'Chưa nhận';
        if (transaction.status === 1 || transaction.status === 3) {
            sttText = 'Đã nhận';
        }

        let typeText = 'Thông thường';
        if (transaction.status === 2 || transaction.status === 3) {
            typeText = 'Có yêu cầu hoàn tiền'
        }

        let refund = 0;
        if (transaction.refund !== null) {
            refund = transaction.refund;
        }

        let paid_dateText = 'Chưa nhận';
        if (transaction.paid_date !== null) {
            paid_dateText = prettierDate(transaction.paid_date);
        }

        let start_dateText = 'Chưa bắt đầu';
        if(transaction.start_date !== null || transaction.start !== null) {
            start_dateText = prettierDate(transaction.start_date || transaction.start);
        }

        let end_dateText = 'Chưa kết thúc';
        if(transaction.end !== null) {
            end_dateText = prettierDate(transaction.end);
        }
        Swal.fire({
            title: '<b>Chi tiết hóa đơn thu nhập</b>',
            html:
                `<div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Người thuê :</label>
                        <div class='col-7'>${transaction.employer}</div>                    
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Mã công việc :</label>
                        <div class='col-7'>${transaction.id_job}</div>
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Người làm :</label>
                        <div class='col-7'>${userInfo.personal.fullname}</div>                    
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Số tiền :</label>
                        <div class='col-7'>${prettierNumber(transaction.amount * (100 - refund) / 100)}</div>
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-8'>Ngày thanh toán :</label>
                        <div class='col-4'>${paid_dateText}</div>                    
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-8'>Ngày bắt đầu dự tính :</label>
                        <div class='col-4'>${start_dateText}</div>
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-8'>Ngày kết thúc theo dự tính :</label>
                        <div class='col-4'>${prettierDate(transaction.deadline || transaction.end_date)}</div>
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-8'>Ngày kết thúc thực tế :</label>
                        <div class='col-4'>${end_dateText}</div>
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Loại hóa đơn :</label>
                        <div class='col-4'>${typeText}</div>
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Trang thái :</label>
                        <div class='col-4'>${sttText}</div>
                    </div>
                </div>`,
            showCloseButton: true,
            showConfirmButton: false,
            focusConfirm: false
        })
    }

    renderTransaction(transactions, total) {
        let content = [];
        if (total === -1) {
            content.push(
                <tr key={0}>
                    <td colSpan='7' className='p-5 text-center'>
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </td>
                </tr>
            )
        }
        else if (transactions.length > 0) {
            transactions.forEach((e, index) => {
                let refund = 0;
                if (e.refund !== null) {
                    refund = Number.parseInt(e.refund);
                }
                content.push(
                    <tr key={index}>
                        {(
                            this.state.queryType === 0
                                ?
                                <td style={{ width: '30px' }}><input id={'select-input-' + e.id_transaction} type='checkbox'></input></td>
                                :
                                ''
                        )}
                        <td style={{ width: '120px' }}>{e.id_job}</td>
                        <td><div className='text-truncate' style={{ width: '150px' }}>{e.employer}</div></td>
                        <td>{prettierDate(e.start)}</td>
                        <td>{prettierNumber(e.amount * (100 - refund) / 100)} VNĐ</td>
                        {(
                            this.state.queryType === 0
                                ?
                                <td className='text-center' style={{ width: '120px' }}>
                                    <i className='icon-material-outline-gavel cursor-pointer' onClick={() => { this.handlePayOne(e.id_transaction, e.end) }}></i>
                                </td>
                                :
                                ''
                        )}
                        <td className='text-center'>
                            <i className='icon-feather-eye cursor-pointer' onClick={() => { this.handleDetail(e) }}></i>
                        </td>
                    </tr>);
            })
        }
        else {
            content.push(
                <tr key={0}><td colSpan="7" className='p-5'>Bạn hiện không nhận được thu nhập nào...</td></tr>
            )
        }

        return content;
    }

    renderPagination(page, totalPage) {
        let content = [];
        let start = 1,
            end = 4;
        if (totalPage - 4 < page) {
            if (totalPage - 4 <= 0) {
                start = 1;
            } else {
                start = totalPage - 4;
            }
            end = totalPage;
        } else {
            start = page;
            end = page + 3;
        }

        for (let e = start; e <= end; e++) {
            content.push(
                <li className={'page-item ' + (page === e ? "active" : '')} key={e}>
                    <div
                        className="page-link cursor-pointer"
                        onClick={() => {
                            this.handlePagination(e);
                        }}
                    >
                        {e}
                    </div>
                </li>
            );
        }
        return content;
    }

    render() {
        let { transaction, totalTransaction, currentTransactionPage } = this.props.UserDetailReducer;
        let totalPage = Math.ceil(totalTransaction / 8);

        return (
            <div className="container-fluid px-0">
                {/* Page Heading */}
                <h1 className="h3 mb-4 text-gray-800">Thu nhập của người dùng</h1>

                <div>
                    {/* Headline */}
                    <div className="row my-1">
                        <div className='col-8'>
                            <div className="btn-group btn-group-sm" role="group">
                                <div onClick={() => { if (this.state.queryType !== 0) { this.handleFilter(0) } }} className={"btn " + (this.state.queryType === 0 ? 'btn-danger' : 'btn-outline-danger')}>Chưa thành toán</div>
                                <div onClick={() => { if (this.state.queryType !== 1) { this.handleFilter(1) } }} className={"btn " + (this.state.queryType === 1 ? 'btn-success' : 'btn-outline-success')}>Đã thành toán</div>
                            </div>
                        </div>
                        <div className="col-4 text-right d-flex">
                            <div className='mr-2'>
                                <div className='btn btn-primary'
                                    onClick={() => {
                                        if (this.state.queryId !== '') {
                                            document.getElementById('transaction-search-input').value = '';
                                            this.setState({ queryId: '' }, () => {
                                                this.loadTransaction(1, this.state.queryType, this.state.queryId)
                                            })
                                        }
                                    }}>
                                    <i className='icon-feather-rotate-ccw'></i>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="search" id="transaction-search-input" className="form-control" placeholder="Tìm kiếm theo mã công việc .." />
                                <div className="input-group-append">
                                    <div className="btn btn-outline-secondary" type="button" onClick={() => { this.handleSearchIdApplicant() }}>
                                        <i className="fa fa-search"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="table-responsive">
                        <table className="col-12 table" id="dataTable" width="100%" cellSpacing={0} >
                            <thead className="thead-dark">
                                <tr>
                                    {(
                                        this.state.queryType === 0
                                            ?
                                            <th></th>
                                            :
                                            ''
                                    )}
                                    <th>ID công việc</th>
                                    <th>Người thuê</th>
                                    <th>Ngày bắt đầu</th>
                                    <th>Số tiền</th>
                                    {(
                                        this.state.queryType === 0
                                            ?
                                            <th>Thanh toán</th>
                                            :
                                            ''
                                    )}
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTransaction(transaction, totalTransaction)}
                            </tbody>
                        </table>

                    </div>

                    <div className='row'>
                        <div className='col-6'>
                            {/* Pagination */}
                            {(
                                totalTransaction === 0
                                    ?
                                    ''
                                    :
                                    <nav aria-label="...">
                                        <ul className="pagination">
                                            <li className={"pagination-item " + ((currentTransactionPage === 1 || totalPage - currentTransactionPage < 3) && "d-none")}>
                                                <div className="cursor-pointer page-link" onClick={() => { this.handlePagination(currentTransactionPage - 1); }}>
                                                    <i className="icon-material-outline-keyboard-arrow-left" />
                                                </div>
                                            </li>
                                            {this.renderPagination(currentTransactionPage, totalPage)}
                                            <li className={"pagination-item " + (totalPage - currentTransactionPage < 3 && "d-none")}>
                                                <div className="cursor-pointer page-link" onClick={() => { this.handlePagination(currentTransactionPage + 1); }}>
                                                    <i className="icon-material-outline-keyboard-arrow-right" />
                                                </div>
                                            </li>
                                        </ul>
                                    </nav>
                            )}
                        </div>
                        {(
                            this.state.queryType === 0
                                ?
                                <div className='col-6 text-right'>
                                    <div className='btn btn-danger' onClick={() => { this.handlePaySelected() }}>Thanh toán mục đã chọn</div>
                                </div>
                                :
                                ''
                        )}
                    </div>
                </div>

            </div>
        )
    }
}

// Container 
const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadTransactionList(page, id_user, id_status, id_job) {
            dispatch(loadTransactionList(page, 8, id_user, id_status, id_job))
        },
        onRequestPayment() {
            dispatch({
                type: 'USER_TRANSACTION_LIST_REQUEST',
            })
        },
    }
}

const UserTransaction = withRouter(connect(mapStateToProps, mapDispatchToProps)(UserTransactionComponent));
export default UserTransaction;