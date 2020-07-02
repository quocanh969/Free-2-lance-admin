import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { prettierDate, prettierNumber } from '../../../Ultis/Helper/HelperFunction';

class UserTransactionComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            queryType: 0,
            queryId: null,
        }
    }

    loadTransaction(page, queryId) {
        // let { onLoadJobList } = this.props;
        // let { userInfo } = this.props.UserDetailReducer;
        // onLoadJobList(page, 8, queryName, status, userInfo.personal.id_user);
    }

    handleFilter(newType) {
        this.setState({queryType: newType},() => {
            // this.loadJobListFunc(1, this.state.queryName, this.state.queryType);
        })
    }

    handlePagination(pageNum) {
        // if (pageNum !== this.props.UserDetailReducer.currentJob) {
        //     this.loadJobListFunc(pageNum, this.state.queryName, this.state.queryType);
        // }
    }

    handleSearchIdApplicant() {
        let searchStr = document.getElementById('transaction-search-input').value;
        if (searchStr === this.state.queryId) {
            return;
        }
        else {
            let id = Number.parseInt(searchStr);
            if(!isNaN(id)) {
                this.setState({ queryId: Number.parseInt(searchStr) }, () => {
                    //this.loadTransaction(1, this.state.queryName, this.state.queryType);
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

    handleSelectRow(id) {
        let temp = {...this.state.selected};
        
    }

    handlePayOne(id) {
        Swal.fire({
            text: "Bạn có chắc là muốn thanh toán cho công việc này",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ok, tôi đồng ý',
            cancelButtonText: 'Không, tôi đã suy nghĩ lại',
            reverseButtons: true,
        }).then((result) => {
            if (result.value) {
                console.log('Thanh toán thành công');                
                Swal.fire({
                    text: 'Thanh toán thành công',
                    icon: 'success',
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

    handlePaySelected() {
        let {transaction} = this.props.UserDetailReducer;
        let selectedArr = [];
        transaction.forEach((e, index) => {
            let input = document.getElementById('select-input-'+index);
            if(input.checked) {
                selectedArr.push(index);
            }
        })

        console.log(selectedArr);

        Swal.fire({
            text: "Bạn có chắc là muốn thanh toán cho các công việc được chọn này này",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ok, tôi đồng ý',
            cancelButtonText: 'Không, tôi đã suy nghĩ lại',
            reverseButtons: true,
        }).then((result) => {
            if (result.value) {
                console.log('Thanh toán thành công');                
                Swal.fire({
                    text: 'Thanh toán thành công',
                    icon: 'success',
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

    handleDetail() {

        Swal.fire({
            title: '<b>Chi tiết hóa đơn thu nhập</b>',
            html:
                `<div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Người thuê :</label>
                        <div class='col-7'>JOhn CEna</div>                    
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Thông tin tài khoản :</label>
                        <div class='col-7'>0958713698478526</div>                    
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Người làm :</label>
                        <div class='col-7'>ThE CoCk</div>                    
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Mã công việc :</label>
                        <div class='col-7'>123</div>
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Số tiền :</label>
                        <div class='col-7'>2,000,000 VNĐ</div>
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Ngày thanh toán :</label>
                        <div class='col-7'>09/07/2020</div>                    
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Ngày có thể nhận :</label>
                        <div class='col-7'>20/07/2020</div>
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Trang thái :</label>                        
                    </div>
                </div>`,
            showCloseButton: true,
            showConfirmButton: false,
            focusConfirm: false
        })
    }

    renderTransaction(transactions) {
        let content = [];
        transactions.forEach((e, index) => {
            content.push(
                <tr key={index}>
                    <td style={{width:'50px'}}><input id={'select-input-'+index} type='checkbox' onChange={()=>{this.handleSelectRow(index)}}></input></td>
                    <td>1</td>
                    <td><div className='text-truncate' style={{ width: '120px' }}>John Cena</div></td>
                    <td>{prettierDate(new Date())}</td>
                    <td>{prettierNumber(2000000)} VNĐ</td>
                    <td className='text-center' style={{width: '120px'}}>
                        <i className='icon-material-outline-gavel cursor-pointer' onClick={()=>{this.handlePayOne(index)}}></i>
                    </td>
                    <td className='text-center'>
                        <i className='icon-feather-eye cursor-pointer' onClick={()=>{this.handleDetail()}}></i>
                    </td>
                </tr>);
        })

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
                                <div onClick={() => { if(this.state.queryType !== 0) {this.handleFilter(0)} }} className={"btn " + (this.state.queryType === 0 ? 'btn-danger' : 'btn-outline-danger')}>Chưa thành toán</div>
                                <div onClick={() => { if(this.state.queryType !== 1) {this.handleFilter(1)} }} className={"btn " + (this.state.queryType === 1 ? 'btn-success' : 'btn-outline-success')}>Đã thành toán</div>                                
                            </div>
                        </div>
                        <div className="col-4 text-right d-flex">
                            <div className='mr-2'>
                                <div className='btn btn-primary'
                                    onClick={() => {
                                        if (this.state.queryId.length > 0) {
                                            document.getElementById('job-search-input').value = '';
                                            this.setState({ queryId: '' }, () => {
                                                // this.loadJobListFunc(1, this.state.queryName, this.state.queryType)
                                            })
                                        }
                                    }}>
                                    <i className='icon-feather-rotate-ccw'></i>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="search" id="transaction" className="form-control" placeholder="Tìm kiếm theo mã công việc .." />
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
                                    <th></th>
                                    <th>ID công việc</th>
                                    <th>Người thuê</th>
                                    <th>Ngày bắt đầu</th>
                                    <th>Số tiền</th>
                                    <th>Thanh toán</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTransaction(transaction)}
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
                        <div className='col-6 text-right'>
                            <div className='btn btn-danger' onClick={()=>{this.handlePaySelected()}}>Thanh toán mục đã chọn</div>
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

    }
}

const UserTransaction = withRouter(connect(mapStateToProps, mapDispatchToProps)(UserTransactionComponent));
export default UserTransaction;