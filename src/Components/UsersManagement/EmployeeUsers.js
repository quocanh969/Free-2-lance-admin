import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Swal from 'sweetalert2';

class EmployeeUsersComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            queryType: 1, // 1 - tất cả, 2 - bị cấm, 3 - chưa kích hoạt, 4 - chờ xác thực, 5 - đã xác thực
        }
    }

    componentWillMount() {
        this.loadJobListFunc(1, '', 3); // lấy tất cả
    }

    loadJobListFunc(page, queryName, account_status) {
        
    }

    handlePagination(pageNum) {
        // if (pageNum !== this.props.EmployerReducer.currentApplyingPage) {
        //     this.loadJobListFunc(pageNum);
        // }
    }

    handleSearchEmployee() {
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

        if (val === -1 || (current_value === -1 && val === 1)) {
            let text = '';
            if (val === -1) {
                text = 'cấm';
            }
            else {
                text = 'kích hoạt';
            }
            Swal.fire({
                text: "Bạn có chắc là muốn " + text + " tài khoản người dùng",
                icon: 'warning',
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
        else {
            Swal.fire({
                text: 'Bạn không thể thay đổi trạng thái của người dùng này',
                icon: 'warning',
            });
            document.getElementById('select-status-' + id_user).value = current_value;
        }

    }

    renderUserList() {
        let { personal } = this.props.UserListReducer;
        let content = [];

        // personal.forEach((e, index) => {
            content.push(<tr key={0}>
                <td>{1}</td>
                <td>adsf</td>
                <td>asdf</td>
                <td>asdfasdf</td>
                <td>
                    {(1 ? <span className='text-danger'>Quản lý</span> : <span className='text-success'>Nhân viên</span>)}
                </td>
                <td className='text-center'>
                    <div><i className='icon-feather-trash-2 cursor-pointer'></i></div>
                </td>
            </tr>); 
        // })
            
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
                <h1 className="h3 mb-2 text-gray-800">Quản lý thông tin nhân viên</h1>
                <p className="mb-4">
                    Danh sách các nhân viên
                </p>
                {/* Userlist DataTales Example */}
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary"><i className="icon-line-awesome-list-ul" /> Nhân viên</h6>
                    </div>
                    <div className="card-body">
                        {/* Headline */}
                        <div className="row my-1">
                            <div className='col-6'></div>                            
                            <div className="col-4 text-right">
                                <div className="input-group mb-3">
                                    <input type="text" id="user-search-input" className="form-control" placeholder="Tìm kiếm theo tên nhân viên .." />
                                    <div className="input-group-append">
                                        <div className="btn btn-outline-secondary" type="button" onClick={() => { this.handleSearchEmployee() }}>
                                            <i className="fa fa-search"></i>
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                            <div className='col-2'><div className='w-100 btn btn-danger px-0'><i className='icon-feather-plus'></i>&nbsp;Thêm nhân viên</div></div>
                        </div>
                        
                        {/* Table */}
                        <div className="table-responsive">
                            <table className="col-12 table" id="dataTable" width="100%" cellSpacing={0} >
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Id</th>
                                        <th>Nhân viên</th>
                                        <th>Số điện thoại</th>
                                        <th>Username</th>
                                        <th>Vai trò</th>                                        
                                        <th>Gỡ tài khoản</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderUserList()}
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

const EmployeeUsers = withRouter(connect(mapStateToProps, mapDispatchToProps)(EmployeeUsersComponent));
export default EmployeeUsers;