import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class UpdateInfoComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            queryType: 1, // 1 - số lượng công việc giảm dần, 2 - số lượng công việc tăng dần
        }
    }

    loadJobListFunc(page) {

    }

    handlePagination(pageNum) {
        // if (pageNum !== this.props.EmployerReducer.currentApplyingPage) {
        //     this.loadJobListFunc(pageNum);
        // }
    }

    handleSearchTopic() {
        let searchStr = document.getElementById('user-search-input').value;
        if (searchStr === '') {
            return;
        }
        else {
            // gọi api
        }
    }

    renderTagsList() {
        // let { tutorData, status, message, loading } = this.props.UsersReducer;
        let content = [];
        // for (let e of tutorData) {
        //     let imgSrc = e.avatarLink;
        //     if (imgSrc === "" || imgSrc === null) {
        //     }

        content.push(<tr key={0}>
            <td>1</td>
            <td>Kinh doanh buôn bán</td>
            <td>20</td>
            <td>
                <i className='icon-line-awesome-wrench cursor-pointer text-primary' onClick={() => { console.log('edit') }}></i>
            </td>
            <td>
                <i className='icon-feather-trash-2 cursor-pointer text-primary' onClick={() => { console.log('remove') }}></i>
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
        let {user} = this.props.AccountReducer;
        if(user === null) return '';
        else {
            return (
                <div className="container-fluid">
                    {/* Page Heading */}
                    <h1 className="h3 mb-2 text-gray-800">Quản lý thông tin tài khoản</h1>
                    <br></br>
                    {/* Userlist DataTales Example */}
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary"><i className="icon-feather-user" />&nbsp;&nbsp;Thông tin tài khoản người dùng</h6>
                        </div>
    
                        <div className="card-body">
                            <div className="row mt-2">
                                <div className='col-6 border-right border-dark'>
                                    <div className="row mt-2">
                                        <div className="col-4">
                                            <label>Mã người dùng</label>
                                        </div>
                                        <div className="col-8">
                                            <p>{user.id_user}</p>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-4">
                                            <label>Tên đăng nhập</label>
                                        </div>
                                        <div className="col-8 input-group">
                                            <input id='username-input' className="form-control" defaultValue={user.username}></input>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-4">
                                            <label>Họ tên nhân viên</label>
                                        </div>
                                        <div className="col-8 input-group">
                                            <input id='name-input' className="form-control" defaultValue={user.fullname}></input>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-4">
                                            <label>Số điện thoại</label>
                                        </div>
                                        <div className="col-8 input-group">
                                            <input id='tel-input' className="form-control" defaultValue={user.tel}></input>
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className='text-center'>
                                        <button type='submit' className='btn btn-primary'>Cập nhật thông tin</button>
                                    </div>                             
                                </div>
    
                                <div className='col-6 border-left border-dark'>
                                    <br></br>
                                    <br></br>
                                    <div className="row mt-2">
                                        <div className="col-5">
                                            <label>Nhập mật khâu cũ</label>
                                        </div>
                                        <div className="col-7 input-group">
                                            <input id='old-password-input' type='password' className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-5">
                                            <label>Nhập mật khâu mới</label>
                                        </div>
                                        <div className="col-7 input-group">
                                            <input id='new-password-input' type='password' className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-5">
                                            <label>Nhập lại mật khâu mới</label>
                                        </div>
                                        <div className="col-7 input-group">
                                            <input id='confirm-password-input' type='password' className="form-control"></input>
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className='text-center'>
                                        <button type='submit' className='btn btn-primary'>Đổi mật khẩu</button>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                    </div>
                </div>
            )
        }
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

const UpdateInfo = withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateInfoComponent));
export default UpdateInfo;