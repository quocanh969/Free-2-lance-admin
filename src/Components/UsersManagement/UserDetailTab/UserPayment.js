import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { prettierDate, prettierNumber } from '../../../Ultis/Helper/HelperFunction';
import { loadPaymentList } from '../../../Actions/Transaction.action';

class UserPaymentComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            queryType: 0,
            queryId: '',
        }
    }

    loadTransaction(page, id_status, id_job) {
        let { onLoadPaymentList } = this.props;
        let { userInfo } = this.props.UserDetailReducer;        
        onLoadPaymentList(page, userInfo.personal.id_user, id_status, id_job)
    }

    handleFilter(newType) {
        this.setState({queryType: newType},() => {
            this.loadTransaction(1, this.state.queryType, this.state.queryId);
        })
    }

    handlePagination(pageNum) {
        if (pageNum !== this.props.UserDetailReducer.currentPaymentPage) {
            this.loadTransaction(pageNum, this.state.queryType, this.state.queryId);
        }
    }

    handleSearchIdApplicant() {
        let searchStr = Number.parseInt(document.getElementById('payment-input-search').value);        
        if (searchStr === this.state.queryId) {
            return;
        }
        else {            
            if (isNaN(Number.parseInt(searchStr)) === false) {
                this.setState({ queryId: searchStr}, () => {
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

    handleDetail(transaction) {
        let {userInfo} = this.props.UserDetailReducer;

        let sttText = 'Chưa nhận';
        if(transaction.status === 1) {
            sttText = 'Đã nhận';
        }

        let refund = 0;
        if(transaction.refund !== null) {
            refund = transaction.refund;
        }

        let paid_dateText = 'Chưa nhận';
        if(transaction.paid_date !== null) {
            paid_dateText = prettierDate(transaction.paid_date);
        }

        Swal.fire({
            title: '<b>Chi tiết hóa đơn</b>',
            html:
                `<div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Người thuê :</label>
                        <div class='col-7'>${userInfo.personal.fullname}</div>                    
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Thông tin tài khoản :</label>
                        <div class='col-7'>${transaction.orderIf}</div>                    
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Người làm :</label>
                        <div class='col-7'>${transaction.employee}</div>                    
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Mã công việc :</label>
                        <div class='col-7'>${transaction.id_job}</div>
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Số tiền :</label>
                        <div class='col-7'>${transaction.amount}</div>
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-8'>Ngày thanh toán :</label>
                        <div class='col-4'>${paid_dateText}</div>                    
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-8'>Ngày bắt đầu công việc :</label>
                        <div class='col-4'>${prettierDate(transaction.start_date || transaction.start)}</div>
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-8'>Ngày kết thúc theo dự tính :</label>
                        <div class='col-4'>${prettierDate(transaction.deadline || transaction.end_date)}</div>
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-8'>Ngày kết thúc thực tế :</label>
                        <div class='col-4'>${prettierDate(transaction.end)}</div>
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

    renderPayment(payment, total) {
        let content = [];
        if(total === -1) {
            content.push(
                <tr key={0}>
                    <td colSpan='6' className='p-5 text-center'>
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </td>                    
                </tr>
            )
        }
        else if(payment.length > 0) {
            payment.forEach((e, index) => {
                content.push(
                    <tr key={index}>
                        <td>{e.id_job}</td>
                        <td><div className='text-truncate' style={{ width: '120px' }}>{e.employee}</div></td>
                        <td>{prettierDate(e.start)}</td>
                        <td>{(e.paid_date === null ? 'Chưa nhận' : prettierDate(e.paid_date))}</td>
                        <td>{prettierNumber(e.amount)} VNĐ</td>
                        <td className='text-center'>
                            <i className='icon-feather-eye cursor-pointer' onClick={()=>{this.handleDetail(e)}}></i>
                        </td>
                    </tr>);
            })
        }
        else {
            content.push(
                <tr key={0}>
                    <td colSpan='6' className='p-5'>
                        Danh sách tiền thánh toán rỗng !!
                    </td>                    
                </tr>
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
        let { payment, totalPayment, currentPaymentPage } = this.props.UserDetailReducer;
        let totalPage = Math.ceil(totalPayment / 8);

        return (
            <div className="container-fluid px-0">
                {/* Page Heading */}
                <h1 className="h3 mb-4 text-gray-800">Thanh toán công việc</h1>

                <div>
                    {/* Headline */}
                    <div className="row my-1">
                        <div className='col-8'>
                            <div className="btn-group btn-group-sm" role="group">
                                <div onClick={() => { if (this.state.queryType !== 0) { this.handleFilter(0) } }} className={"btn " + (this.state.queryType === 0 ? 'btn-primary' : 'btn-outline-primary')}>Lịch sử bình thường</div>
                                <div onClick={() => { if (this.state.queryType !== 1) { this.handleFilter(1) } }} className={"btn " + (this.state.queryType === 1 ? 'btn-success' : 'btn-outline-success')}>Lịch sử hoàn tiền</div>
                            </div>
                        </div>
                        <div className="col-4 text-right d-flex">
                            <div className='mr-2'>
                                <div className='btn btn-primary'
                                    onClick={() => {
                                        if (this.state.queryId.length > 0) {
                                            document.getElementById('payment-input-search').value = '';
                                            this.setState({ queryId: '' }, () => {
                                                this.loadTransaction(1, this.state.queryType, this.state.queryId)
                                            })
                                        }
                                    }}>
                                    <i className='icon-feather-rotate-ccw'></i>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="search" id="payment-input-search" className="form-control" placeholder="Tìm kiếm theo mã công việc .." />
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
                                    <th>ID công việc</th>
                                    <th>Người làm</th>
                                    <th>Ngày bắt đầu</th>
                                    <th>Ngày thanh toán</th>
                                    <th>Số tiền</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderPayment(payment)}
                            </tbody>
                        </table>

                    </div>

                    <div className='row'>
                        <div className='col-6'>
                            {/* Pagination */}
                            {(
                                totalPayment === 0
                                    ?
                                    ''
                                    :
                                    <nav aria-label="...">
                                        <ul className="pagination">
                                            <li className={"pagination-item " + ((currentPaymentPage === 1 || totalPage - currentPaymentPage < 3) && "d-none")}>
                                                <div className="cursor-pointer page-link" onClick={() => { this.handlePagination(currentPaymentPage - 1); }}>
                                                    <i className="icon-material-outline-keyboard-arrow-left" />
                                                </div>
                                            </li>
                                            {this.renderPagination(currentPaymentPage, totalPage)}
                                            <li className={"pagination-item " + (totalPage - currentPaymentPage < 3 && "d-none")}>
                                                <div className="cursor-pointer page-link" onClick={() => { this.handlePagination(currentPaymentPage + 1); }}>
                                                    <i className="icon-material-outline-keyboard-arrow-right" />
                                                </div>
                                            </li>
                                        </ul>
                                    </nav>
                            )}
                        </div>                        
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
        onLoadPaymentList: (page, id_user, id_status, id_job) => {
            dispatch(loadPaymentList(page, 8, id_user, id_status, id_job));
        }
    }
}

const UserPayment = withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPaymentComponent));
export default UserPayment;