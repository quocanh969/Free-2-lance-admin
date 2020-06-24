import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Swal from 'sweetalert2';
import { prettierDate } from '../../Ultis/Helper/HelperFunction';

class ReportsComponent extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            queryType: 1, // 1 - tất cả, 2 - chưa giải quyết, 3 - đã giải quyết
        }
    }

    loadJobListFunc(page) {

    }

    handlePagination(pageNum) {
        // if (pageNum !== this.props.EmployerReducer.currentApplyingPage) {
        //     this.loadJobListFunc(pageNum);
        // }
    }

    handleSearchUser() {
        let searchStr = document.getElementById('user-search-input').value;
        if (searchStr === '') {
            return;
        }
        else {
            // gọi api
        }
    }

    handleChangeStatus(id_user, current_value) {
        let val = Number.parseInt(document.getElementById('select-status-' + id_user).value);

        if (current_value === val) return;

        if (val === 2) {            
            const {value: solve} = Swal.fire({
                text: "Bạn đã giải quyết xong khiếu nại này, vui lòng nhập phương thức của bạn",
                input: 'text',
                showCancelButton: true,
                confirmButtonText: 'Ok, tôi đồng ý',
                cancelButtonText: 'Không, tôi đã suy nghĩ lại',
                reverseButtons: true,
                inputValidator: (value) => {
                    if (!value) {
                      return 'Bạn vẫn chưa điền phương thức giải quyết !'
                    }
                }
            }).then((result) => {
                if (result.value) {
                    console.log(result.value);
                    Swal.fire({
                        text: 'Thay đổi thành công',
                        icon: 'success',
                    })
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire({
                        text: 'Thay đổi không được thực hiện',
                        icon: 'error',
                    })
                    document.getElementById('select-status-' + id_user).value = current_value;
                }
                else {
                    document.getElementById('select-status-' + id_user).value = current_value;
                }
            })
        }
        else {
            Swal.fire({
                text: "Bạn muốn thay đổi thành trang thái chưa giải quyết cho khiếu nại này",
                showCancelButton: true,
                confirmButtonText: 'Ok, tôi đồng ý',
                cancelButtonText: 'Không, tôi đã suy nghĩ lại',
                reverseButtons: true,
            }).then((result) => {
                if (result.value) {
                    Swal.fire({
                        text: 'Thay đổi thành công',
                        icon: 'success',
                    })
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire({
                        text: 'Thay đổi không được thực hiện',
                        icon: 'error',
                    })
                    document.getElementById('select-status-' + id_user).value = current_value;
                }
                else {
                    document.getElementById('select-status-' + id_user).value = current_value;
                }
            })
        }

    }

    handleDetail(id_report) {
        let name1 = 'John Cena', role1 = 'người làm thuê', name2 = 'The Rock', role2 = 'người thuê', date = prettierDate(new Date()), status = 'Chưa giải quyết', content = `A BEAUTIFUL, RESPONSIVE, CUSTOMIZABLE, ACCESSIBLE (WAI-ARIA) REPLACEMENT FOR JAVASCRIPT'S POPUP BOXES`;
        
        Swal.fire({
            title: '<b>Chi tiết khiếu nại</b>',
            html:
              `<div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Người khiếu nại :</label>
                        <div class='col-7'>${name1}</div>                    
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Vai trò :</label>
                        <div class='col-7'>${role1}</div>                    
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Người bị khiếu nại :</label>
                        <div class='col-7'>${name2}</div>
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Vai trò :</label>
                        <div class='col-7'>${role2}</div>                    
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Ngày phản hồi :</label>
                        <div class='col-7'>${date}</div>
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Tình trạng :</label>
                        <div class='col-7'>${status}</div>
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Nội dung :</label>
                        <div class='col-7'>${content}</div>
                    </div>
                </div>`,
            showCloseButton: true,  
            showConfirmButton: false,          
            focusConfirm: false
        })
    }    

    renderReportsList() {
        // let { tutorData, status, message, loading } = this.props.UsersReducer;
        let content = [];
        // for (let e of tutorData) {
        //     let imgSrc = e.avatarLink;
        //     if (imgSrc === "" || imgSrc === null) {
        //     }

        content.push(<tr key={0}>
            <td>{prettierDate(new Date())}</td>
            <td>John Cena</td>
            <td>Người làm thuê</td>
            <td>The Rock</td>
            <td>Người thuê</td>
            <td>
                <div className='text-truncate' style={{ width: '150px' }}>124 Đường số 12345678215ssx12ca32151v515e415e4eq</div>                
            </td>
            <td>
                <select id={'select-status-' + 1} defaultValue={2} onChange={() => { this.handleChangeStatus(1, 2) }}>                    
                    <option value={1}>Chờ giải quyết</option>
                    <option value={2}>Đã giải quyết</option>
                </select>
            </td>
            <td className='text-center'>
                <i className='icon-feather-eye cursor-pointer text-primary' onClick={()=>{this.handleDetail(1)}}></i>
            </td>
        </tr>);
        // }
        //}

        return content;
    }

    renderPagination(page, totalPage) {
        let content = [];
        let start = 1,
            end = 4;
        if (totalPage - 4 < page) {
            if (totalPage - 4 < 0) {
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
                <li className={'page-item '+ (page === e ? "active" : '')} key={e}>
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
        let { totalApplyingJobs, currentApplyingPage } = {totalApplyingJobs: 8, currentApplyingPage: 1};
        let totalPage = Math.ceil(totalApplyingJobs / 4);

        return (
            <div className="container-fluid">
                {/* Page Heading */}
                <h1 className="h3 mb-2 text-gray-800">Quản lý khiếu nại của người dùng</h1>
                <p className="mb-4">
                    Danh sách các khiếu nại gửi lên
                </p>
                {/* Userlist DataTales Example */}
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary"><i className="icon-material-outline-rate-review" />&nbsp;&nbsp;Khiếu nại</h6>
                    </div>
                    <div className="card-body">
                        {/* Headline */}
                        <div className="row my-1">
                            <div className='col-8'>
                                <div className="btn-group btn-group-sm" role="group">
                                    <div onClick={() => { this.setState({ queryType: 1 }) }} className={"btn " + (this.state.queryType === 1 ? 'btn-primary' : 'btn-outline-primary')}>Tất cả</div>
                                    <div onClick={() => { this.setState({ queryType: 2 }) }} className={"btn " + (this.state.queryType === 2 ? 'btn-danger' : 'btn-outline-danger')}>Chưa giải quyết</div>
                                    <div onClick={() => { this.setState({ queryType: 3 }) }} className={"btn " + (this.state.queryType === 3 ? 'btn-secondary' : 'btn-outline-success')}>Đã giải quyết</div>
                                </div>
                            </div>
                            <div className="col-4 text-right">
                                <div className="input-group mb-3">
                                    <input type="text" id="user-search-input" className="form-control" placeholder="Tìm kiếm theo người khiếu nại .." />
                                    <div className="input-group-append">
                                        <div className="btn btn-outline-secondary" type="button" onClick={() => { this.handleSearchUser() }}>
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
                                        <th>Ngày đăng</th>
                                        <th>Người khiếu nại</th>
                                        <th>Vai trò</th>
                                        <th>Người khiếu nại</th>
                                        <th>Vai trò</th>
                                        <th>Nội dung</th>
                                        <th>Trạng thái</th>
                                        <th>Chi tiết</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderReportsList()}
                                </tbody>
                            </table>

                        </div>

                        {/* Pagination */}
                        {(
                            totalApplyingJobs === 0
                                ?
                                ''
                                :
                                <nav aria-label="...">
                                    <ul className="pagination">
                                        <li className={"pagination-item " + ((currentApplyingPage === 1 || totalPage - currentApplyingPage < 3) && "d-none")}>
                                            <div className="cursor-pointer page-link" onClick={() => { this.handlePagination(currentApplyingPage - 1); }}>
                                                <i className="icon-material-outline-keyboard-arrow-left" />
                                            </div>
                                        </li>
                                        {this.renderPagination(currentApplyingPage, totalPage)}
                                        <li className={"pagination-item " + (totalPage - currentApplyingPage < 3 && "d-none")}>
                                            <div className="cursor-pointer page-link" onClick={() => { this.handlePagination(currentApplyingPage + 1); }}>
                                                <i className="icon-material-outline-keyboard-arrow-right" />
                                            </div>
                                        </li>
                                    </ul>

                                    


                                </nav>
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
  
  const mapDispatchToProps = dispatch => {
    return {
  
    }
  }
  
  const Reports = withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportsComponent));
  export default Reports;