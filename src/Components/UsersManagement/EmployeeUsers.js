import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Swal from 'sweetalert2';
import { loadEmployeeList } from '../../Actions/Employee.action';
import { history } from '../../Ultis/history/history';
import { resetEmployeePW, removeEmployee, addNewEmployee } from '../../Services/Employee.service';

class EmployeeUsersComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            queryName: '',
        }
    }

    componentWillMount() {        
        let {user} = this.props.AccountReducer;
        if(user === null || user.isManager === 0) {
            history.push('/');
        }
        else {
            this.loadJobListFunc(1, this.state.queryName);
        }
    }

    loadJobListFunc(page, queryName) {
        let {onLoadEmployeeList} = this.props;
        onLoadEmployeeList(page, 8, queryName);
    }

    handlePagination(pageNum) {
        if (pageNum !== this.props.EmployeeListReducer.currentEmployeePage) {
            this.loadJobListFunc(pageNum, this.state.queryName);
        }
    }

    handleSearchEmployee() {
        let searchStr = document.getElementById('user-search-input').value;
        if (searchStr === '') {
            return;
        }
        else {
            this.setState({queryName: searchStr}, () => {
                this.loadJobListFunc(1, this.state.queryName);
            })
        }
    }

    handleResetPW(id_user) {
        resetEmployeePW(id_user).then(res=>{
            if(res.data.code === '105') {
                Swal.fire({
                    title: 'Mật khẩu của tài khoản chọn đã được khôi phục thành "admin123"',
                    icon: 'success',
                });
            }
            else {
                Swal.fire({
                    title: 'Khôi phục mật khẩu thất bại',
                    icon: 'error',
                });
            }
        }).catch(err=>{
            Swal.fire({
                title: 'Server gặp sự cố',
                icon: 'error',
                position: 'top',
            });
        })
    }

    handleRemove(id_user) {
        removeEmployee(id_user).then(res=>{
            if(res.data.code === '200') {
                this.loadJobListFunc(1,this.state.queryName);
                Swal.fire({
                    title: 'Tài khoản đã bị xóa',
                    icon: 'success',
                });
            }
            else {
                Swal.fire({
                    title: 'Xóa tài khoản thất bại',
                    icon: 'error',
                });
            }
        }).catch(err=>{
            Swal.fire({
                title: 'Server gặp sự cố',
                icon: 'error',
                position: 'top',
            });
        })
    }

    TriggerAddNew() {
        Swal.fire({
            title: 'Thêm mới nhân viên',
            html: `
                <div class='text-left'>
                    <label class='mt-1'>Tên nhân viên:</label>
                    <input type='text' id='fullname-input' class='form-control'>
                    <label class='mt-1'>Số điện thoại:</label>
                    <input type='text' id='tel-input' class='form-control'>
                    <label class='mt-1'>Username:</label>
                    <input type='text' id='username-input' class='form-control'>
                </div>
            `,
            showCloseButton: true,
            focusConfirm: false,
        }).then((result) => {
            if (result.value) {
                let fullname = document.getElementById('fullname-input').value;
                let tel = document.getElementById('tel-input').value;
                let username = document.getElementById('username-input').value;
                this.handleAddNew(fullname, tel, username);
            }
            else {
                
            }
        })
    }

    handleAddNew(fullname, tel, username) {
        addNewEmployee(username, tel, fullname).then((res) => {
            if(res.data.code === '201') {
                this.loadJobListFunc(1,'');
                Swal.fire({
                    title: 'Thêm mới tài khoản thành công',
                    icon: 'success',
                });
            }
            else {
                Swal.fire({
                    title: 'Thêm mới tài khoản thất bại',
                    icon: 'error',
                });
            }
        }).catch(err=> {
            Swal.fire({
                title: 'Server gặp sự cố',
                icon: 'error',
                position: 'top',
            });
        })   
    }

    renderEmployeeList(employees, total) {
        let content = [];
        if(total === - 1) {
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
        else if(employees.length > 0) {
            employees.forEach((e, index) => {
                content.push(<tr key={index}>
                    <td>{e.id_user}</td>
                    <td ><div className='text-truncate' aria-label={e.fullname} style={{width: '130px'}}>{e.fullname}</div></td>
                    <td>{e.tel}</td>
                    <td>{e.username}</td>
                    <td>
                        {(e.isManager === 1 ? <span className='text-danger'>Quản lý</span> : <span className='text-success'>Nhân viên</span>)}
                    </td>
                    <td className='text-center'>
                        <div><i className='icon-material-outline-autorenew cursor-pointer' onClick={()=>{this.handleResetPW(e.id_user)}}></i></div>
                    </td>
                    <td className='text-center'>
                        <div><i className='icon-feather-trash-2 cursor-pointer'></i></div>
                    </td>
                </tr>); 
            })
        }
        else {
            content.push(
                <tr key={0}>
                    <td colSpan='7' className='p-5'>
                        Danh sách nhân viên rỗng !!
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
        let { employees, currentEmployeePage, totalEmployee } = this.props.EmployeeListReducer;
        let totalPage = Math.ceil(totalEmployee / 8);

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
                            <div className='col-4'><div className='w-100 btn btn-danger px-0' onClick={()=>{this.TriggerAddNew()}}><i className='icon-feather-plus'></i>&nbsp;Thêm nhân viên</div></div>                                                        
                            <div className='col-3'></div>
                            <div className="col-5 text-right d-flex">
                                <div className='mr-2'>
                                    <div className='btn btn-primary' 
                                        onClick={()=>{
                                            if(this.state.queryName.length > 0) {
                                                document.getElementById('user-search-input').value='';
                                                this.setState({queryName: ''}, ()=>{
                                                    this.loadJobListFunc(1, '');
                                                    }) 
                                                }
                                            }}>
                                        <i className='icon-feather-rotate-ccw'></i>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="search" id="user-search-input" className="form-control" placeholder="Tìm kiếm theo tên nhân viên .." />
                                    <div className="input-group-append">
                                        <div className="btn btn-outline-secondary" type="button" onClick={() => { this.handleSearchEmployee() }}>
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
                                        <th>Nhân viên</th>
                                        <th>Số điện thoại</th>
                                        <th>Username</th>
                                        <th>Vai trò</th>                                        
                                        <th>Khôi phục mật khẩu</th>
                                        <th>Gỡ tài khoản</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderEmployeeList(employees, totalEmployee)}
                                </tbody>
                            </table>

                        </div>

                        {/* Pagination */}
                        {(
                            totalEmployee === 0
                                ?
                                ''
                                :
                                <nav aria-label="...">
                                    <ul className="pagination">
                                        <li className={"pagination-item " + ((currentEmployeePage === 1 || totalPage - currentEmployeePage < 3) && "d-none")}>
                                            <div className="cursor-pointer page-link" onClick={() => { this.handlePagination(currentEmployeePage - 1); }}>
                                                <i className="icon-material-outline-keyboard-arrow-left" />
                                            </div>
                                        </li>
                                        {this.renderPagination(currentEmployeePage, totalPage)}
                                        <li className={"pagination-item " + (totalPage - currentEmployeePage < 3 && "d-none")}>
                                            <div className="cursor-pointer page-link" onClick={() => { this.handlePagination(currentEmployeePage + 1); }}>
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
        onLoadEmployeeList: (page, take, queryName) => {
            dispatch(loadEmployeeList(page, take, queryName));
        }
    }
}

const EmployeeUsers = withRouter(connect(mapStateToProps, mapDispatchToProps)(EmployeeUsersComponent));
export default EmployeeUsers;