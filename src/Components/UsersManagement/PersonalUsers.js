import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Swal from 'sweetalert2';
import { getPersonalList } from '../../Actions/User.acction';
import { setUserStatus } from '../../Services/User.service';

class PersonalUsersComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            queryName: '',
            queryType: 3, //3 - tất cả, -1 - bị cấm, 1 - chờ xác thực, 2 - đã xác thực
        }

        this.handleFilter = this.handleFilter.bind(this);
    }

    componentWillMount() {
        this.loadJobListFunc(1, '', 3); // lấy tất cả
    }

    loadJobListFunc(page, queryName, account_status) {
        let {onGetPersonalList} = this.props;
        onGetPersonalList(page, queryName, account_status);
    }

    handlePagination(pageNum) {
        if (pageNum !== this.props.UserListReducer.personalCurrentPage) {
            this.loadJobListFunc(pageNum, this.state.queryName, this.state.queryType);
        }
    }

    handleFilter(newType) {
        this.setState({queryType: newType},() => {
            this.loadJobListFunc(1, this.state.queryName, this.state.queryType);
        })
    }

    handleSearchUser() {
        let searchStr = document.getElementById('user-search-input').value;
        if (searchStr === this.state.queryName) {
            return;
        }
        else {
            this.setState({queryName: searchStr},() => {
                this.loadJobListFunc(1, this.state.queryName, this.state.queryType);
            })
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

                    setUserStatus(id_user, val).then(res=>{
                        if(res.data.code === '106') {                            
                            this.loadJobListFunc(this.props.UserListReducer.personalCurrentPage, this.state.queryName, this.queryType);
                            Swal.fire({
                                text: 'Thay đổi thành công',
                                icon: 'success',
                            })
                        }
                        else
                        {
                            Swal.fire({
                                text: 'Thay đổi không được thực hiện',
                                icon: 'error',
                            })
                            document.getElementById('select-status-' + id_user).value = current_value;
                        }
                    }).catch(err=> {
                        alert('Server gặp sự cố')
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

        personal.forEach((e, index) => {
            console.log(e);
            content.push(
            <tr key={index}>
                <td>{e.id_user}</td>
                <td>{e.fullname}</td>
                <td><div className='text-truncate' style={{ width: '100px' }}>{e.email}</div></td>
                <td>{e.dial}</td>
                <td>{e.identity}</td>
                <td><div className='text-truncate' style={{ width: '150px' }}>{e.address}</div></td>
                <td>
                    <select id={'select-status-' + e.id_user} value={e.account_status} onChange={() => { this.handleChangeStatus(e.id_user, e.account_status) }}>
                        <option value={-1}>Bị cấm</option>
                        <option value={1}>Chờ xác thực</option>
                        <option value={2}>Đã xác thực</option>
                    </select>
                </td>
                <td className='text-center'>
                    <NavLink to={'/user-detail/id='+e.id_user}><i className='icon-feather-eye cursor-pointer'></i></NavLink>
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
        let { totalPersnal, personalCurrentPage } = this.props.UserListReducer;
        let totalPage = Math.ceil(totalPersnal / 4);

        return (
            <div className="container-fluid">
                {/* Page Heading */}
                <h1 className="h3 mb-2 text-gray-800">Quản lý thông tin người dùng</h1>
                <p className="mb-4">
                    Danh sách các người dùng cá nhân
                </p>
                {/* Userlist DataTales Example */}
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary"><i className="icon-feather-users" /> Danh sách người dùng</h6>
                    </div>
                    <div className="card-body">
                        {/* Headline */}
                        <div className="row my-1">
                            <div className='col-8'>
                                <div className="btn-group btn-group-sm" role="group">
                                    <div onClick={() => { if(this.state.queryType !== 3 ) this.handleFilter(3) }} className={"btn " + (this.state.queryType === 3 ? 'btn-primary' : 'btn-outline-primary')}>Tất cả</div>
                                    <div onClick={() => { if(this.state.queryType !== -1 ) this.handleFilter(-1) }} className={"btn " + (this.state.queryType === -1 ? 'btn-danger' : 'btn-outline-danger')}>Bị cấm</div>
                                    <div onClick={() => { if(this.state.queryType !== 1 ) this.handleFilter(1) }} className={"btn " + (this.state.queryType === 1 ? 'btn-secondary' : 'btn-outline-secondary')}>Chờ xác thực</div>
                                    <div onClick={() => { if(this.state.queryType !== 2 ) this.handleFilter(2) }} className={"btn " + (this.state.queryType === 2 ? 'btn-success' : 'btn-outline-success')}>Đã xác thực</div>
                                </div>
                            </div>
                            <div className="col-4 text-right">
                                <div className="input-group mb-3">
                                    <input type="text" id="user-search-input" className="form-control" placeholder="Tìm kiếm theo tên/email .." />
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
                                        <th>Số điện thoại</th>
                                        <th>Số CMND</th>
                                        <th>Địa chỉ</th>
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
                            totalPersnal === 0
                                ?
                                ''
                                :
                                <nav aria-label="...">
                                    <ul className="pagination">
                                        <li className={"pagination-item " + ((personalCurrentPage === 1 || totalPage - personalCurrentPage < 3) && "d-none")}>
                                            <div className="cursor-pointer page-link" onClick={() => { this.handlePagination(personalCurrentPage - 1); }}>
                                                <i className="icon-material-outline-keyboard-arrow-left" />
                                            </div>
                                        </li>
                                        {this.renderPagination(personalCurrentPage, totalPage)}
                                        <li className={"pagination-item " + (totalPage - personalCurrentPage < 3 && "d-none")}>
                                            <div className="cursor-pointer page-link" onClick={() => { this.handlePagination(personalCurrentPage + 1); }}>
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
        onGetPersonalList: (page, queryName, account_status) => {
            dispatch(getPersonalList(4, page, queryName, account_status));
        },
    }
}

const PersonalUsers = withRouter(connect(mapStateToProps, mapDispatchToProps)(PersonalUsersComponent));
export default PersonalUsers;