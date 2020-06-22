import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Swal from 'sweetalert2';

class BusinessUsersComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            queryType: 1, // 1 - tất cả, 2 - bị cấm, 3 - chưa kích hoạt, 4 - chờ xác thực, 5 - đã xác thực
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
        if ((current_value === 0 || current_value === -1) && (val === 0 || val === 1 || val === -1)) {
            let text = '';
            if (val === -1) {
                text = 'cấm';
            }
            else if (val === 0) {
                text = 'chuyển về trạng thái chờ kích hoạt'
            }
            else {
                text = 'kích hoạt';
            }

            console.log(val);
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
        // let { tutorData, status, message, loading } = this.props.UsersReducer;
        let content = [];
        // for (let e of tutorData) {
        //     let imgSrc = e.avatarLink;
        //     if (imgSrc === "" || imgSrc === null) {
        //     }

        content.push(<tr key={0}>
            <td>1</td>
            <td>John Cena</td>
            <td><div className='text-truncate' style={{ width: '70px' }}>tranquocanh858@gmail.com</div></td>
            <td><div className='text-truncate' style={{ width: '150px' }}>Công ty trà sữa</div></td>
            <td>Giám đốc</td>
            <td>0123456789</td>
            <td>0123456789101</td>            
            <td>
                <select id={'select-status-' + 1} defaultValue={-1} onChange={() => { this.handleChangeStatus(1, -1) }}>
                    <option value={-1}>Bị cấm</option>
                    <option value={0}>Chưa kích hoạt</option>
                    <option value={1}>Chờ xác thực</option>
                    <option value={2}>Đã xác thực</option>
                </select>
            </td>
            <td className='text-center'>
                <i className='icon-feather-eye cursor-pointer'></i>
            </td>

            {/* <td className="cursor-pointer" onClick={() => this.turnStatusClick(e.id,e.status,e.role, e.email)}>
                    {e.status === 1 || e.status === true
                    ?
                    <i className="fa fa-user text-success"></i>
                    :
                    <i className="fa fa-user-slash text-danger"></i>
                    } 
                </td>
                <td className="cursor-pointer" onClick={() => this.detailClick(e.id, e.role)}>
                    <i className="fa fa-angle-right"></i>
                </td> */}
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
        let { totalApplyingJobs, currentApplyingPage } = { totalApplyingJobs: 8, currentApplyingPage: 1 };
        let totalPage = Math.ceil(totalApplyingJobs / 4);

        return (
            <div className="container-fluid">
                {/* Page Heading */}
                <h1 className="h3 mb-2 text-gray-800">Quản lý thông tin người dùng</h1>
                <p className="mb-4">
                    Danh sách các người dùng doanh nghiệp
                </p>
                {/* Userlist DataTales Example */}
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary"><i className="icon-material-outline-business" /> Danh sách người dùng</h6>
                    </div>
                    <div className="card-body">
                        {/* Headline */}
                        <div className="row my-1">
                            <div className="col-9 btn-group-sm" role="group">
                                <div onClick={() => { this.setState({ queryType: 1 }) }} className={"btn " + (this.state.queryType === 1 ? 'btn-primary' : 'btn-outline-primary')}>Tất cả</div>
                                <div onClick={() => { this.setState({ queryType: 2 }) }} className={"btn " + (this.state.queryType === 2 ? 'btn-danger' : 'btn-outline-danger')}>Bị cấm</div>
                                <div onClick={() => { this.setState({ queryType: 3 }) }} className={"btn " + (this.state.queryType === 3 ? 'btn-warning' : 'btn-outline-warning')}>Chưa kích hoạt</div>
                                <div onClick={() => { this.setState({ queryType: 4 }) }} className={"btn " + (this.state.queryType === 4 ? 'btn-secondary' : 'btn-outline-secondary')}>Chờ xác thực</div>
                                <div onClick={() => { this.setState({ queryType: 5 }) }} className={"btn " + (this.state.queryType === 5 ? 'btn-success' : 'btn-outline-success')}>Đã xác thực</div>
                            </div>
                            <div className="col-3 text-right">
                                <div className="input-group mb-3">
                                    <input type="text" id="user-search-input" className="form-control" placeholder="Search ..." />
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
                                        <th>Id</th>
                                        <th>Tên</th>
                                        <th>Email</th>
                                        <th>Công ty</th>
                                        <th>Vai trò</th>
                                        <th>Số điện thoại</th>
                                        <th>Số CMND</th>                                        
                                        <th>Trạng thái</th>
                                        <th>Chi tiết</th>
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

const BusinessUsers = withRouter(connect(mapStateToProps, mapDispatchToProps)(BusinessUsersComponent));
export default BusinessUsers;