import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeUserInfo, changeUserPassword } from '../../Services/User.service';
import { sendUpdateInfo } from '../../Actions/User.acction';
import Swal from 'sweetalert2';
import { history } from '../../Ultis/history/history';

class UpdateInfoComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: '',
            isSendingUpdateUserInfo: false,
            isSendingChangePassword: false,
            error: false,
            tab: 1,
        }

        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    componentWillMount() {
        this.setState({message: '', error: false});
    }

    handleChangeUserInfo() {
        let fullname = '', tel = '';        
        let {user} = this.props.AccountReducer;

        let newFullname = document.getElementById('name-input');
        let newTel = document.getElementById('tel-input');

        if(user.fullname !== newFullname.value) {
            fullname = newFullname.value;
        }
        if(user.tel !== newTel.value) {
            tel = newTel.value;
        }

        this.setState({isSendingUpdateUserInfo: true}, () => {
            changeUserInfo(fullname, tel).then(res=>{
                this.setState({isSendingUpdateUserInfo: false}, () => {
                    if(res.data.code === '202') {
                        let {onSendUpdateInfo} = this.props;
                        onSendUpdateInfo();
                        Swal.fire({
                            title: 'Cập nhật thông tin thành công',
                            icon: 'success',
                        })
                    }
                    else {
                        Swal.fire({
                            title: 'Cập nhật thông tin thất bại',
                            icon: 'error',
                        })
                    }
                })
            }).catch(err=>{
                newFullname.value = user.fullname;
                newTel.value = user.tel;
                alert('Server gặp sự cố, thử lại sau');
            })
        })
        
    }

    handleChangePassword(e) {
        e.preventDefault();
        
        let oldPW = document.getElementById('old-password-input');
        let newPW = document.getElementById('new-password-input');
        let confirmPW = document.getElementById('confirm-password-input');

        if(confirmPW.value !== newPW.value) {
            this.setState({message: 'Mật khẩu mới không trùng khớp', error: true}, () => {
                Swal.fire({
                    title: 'Đổi mật khẩu thất bại',
                    icon: 'error',
                })
            })
        }
        else {
            this.setState({isSendingChangePassword: true}, () => {
                changeUserPassword(oldPW.value, newPW.value).then(res=>{
                    this.setState({isSendingChangePassword: false}, () => {
                        if(res.data.code === '105') {
                            Swal.fire({
                                title: 'Đổi mật khẩu thành công, vui lòng đăng nhập lại',
                                icon: 'success',
                            })
                            let {onSignOut} = this.props;
                            onSignOut();
                            localStorage.clear();
                            history.push('/login');
                        }
                        else {
                            this.setState({message: 'Mật khẩu cũ không đúng', error: true}, () => {
                                Swal.fire({
                                    title: 'Đổi mật khẩu thất bại',
                                    icon: 'error',
                                })
                            })
                        }
                    })
                    
                }).catch(err=>{                
                    Swal.fire({
                        title: 'Server gặp sự cố',
                        icon: 'error',
                    });
                })
            })
            
        }
        
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
                        <div className='card-header px-0'>
                            <span className="p-3 h6 m-0 font-weight-bold text-primary icon-header">
                                <i className="icon-feather-user"/>
                            </span>
                            <span onClick={()=>{if(this.state.tab !== 1){this.setState({tab: 1})}}}
                                className={"p-3 h6 m-0 font-weight-bold text-primary cursor-pointer " + (this.state.tab === 1 ? 'tab-active' : '')}>
                                Cập nhật thông tin
                            </span>
                            <span onClick={()=>{if(this.state.tab !== 2){this.setState({tab: 2})}}}
                                className={"p-3 h6 m-0 font-weight-bold text-primary cursor-pointer " + (this.state.tab === 2 ? 'tab-active' : '')}>
                                Đổi mật khẩu
                            </span>
                        </div>
    
                        {(
                            this.state.tab === 1
                            ?
                            <div className='card-body'>
                                <div>
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
                                            <p>{user.username}</p>
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
                                            <input id='tel-input' pattern="[0-9+]{10,11}" className="form-control" defaultValue={user.tel}></input>
                                        </div>
                                    </div>
                                    <hr></hr>
                                    {(
                                        this.state.isSendingUpdateUserInfo
                                        ?
                                        <div className='w-100 text-center'>
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                        :
                                        <div className='text-center'>
                                            <div onClick={()=>{this.handleChangeUserInfo()}} className='btn btn-primary'>Cập nhật thông tin</div>
                                        </div>
                                    )}
                                                                 
                                </div>
                            </div>
                            :
                            <div className="card-body">
                                <form onSubmit={this.handleChangePassword}>
                                    <div className="row mt-2">
                                        <div className="col-4">
                                            <label>Nhập mật khâu cũ</label>
                                        </div>
                                        <div className="col-8 input-group">
                                            <input id='old-password-input' required type='password' className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-4">
                                            <label>Nhập mật khâu mới</label>
                                        </div>
                                        <div className="col-8 input-group">
                                            <input id='new-password-input' required type='password' className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-4">
                                            <label>Nhập lại mật khâu mới</label>
                                        </div>
                                        <div className="col-8 input-group">
                                            <input id='confirm-password-input' required type='password' className="form-control"></input>
                                        </div>
                                    </div>

                                    {(
                                        this.state.error
                                        ?
                                        <div className="alert alert-danger rounded mt-2" role="alert">
                                            {this.state.message}
                                        </div>
                                        :
                                        ''
                                    )}                                    

                                    <hr></hr>
                                    {(
                                        this.state.isSendingChangePassword
                                        ?
                                        <div className='w-100 text-center'>
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                        :
                                        <div className='text-center'>
                                            <button type='submit' className='btn btn-primary'>Đổi mật khẩu</button>
                                        </div>
                                    )}
                                    
                                </form>                            
                            </div>
                        )}
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
        onSendUpdateInfo: () => {
            dispatch(sendUpdateInfo());
        },
        onSignOut: () => {
            dispatch({
                type: 'USER_LOG_OUT',
            })
        },
    }
}

const UpdateInfo = withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateInfoComponent));
export default UpdateInfo;