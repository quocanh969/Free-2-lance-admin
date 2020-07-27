import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getImageSrc, prettierDate } from '../../../Ultis/Helper/HelperFunction';

import avatarPlaceholder from '../../../Assets/images/avatar_placeholder.png';
import imagePlaceholder from '../../../Assets/images/image-placeholder.jpg';

import Swal from 'sweetalert2';
import { udpateUserStatus, rejectUserIdentity } from '../../../Actions/User.acction';

class UserInfoComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: 1,
        }
    }

    handleChangeStatus(newStatus) {
        let {userInfo} = this.props.UserDetailReducer;
        let {onUpdateUserStatus} = this.props;

        if (userInfo.personal.account_status === newStatus) {
            return;
        }
        else if(newStatus === 2 && userInfo.personal.account_status !== 1) {
            Swal.fire({
                title: "Bạn không thể xác thực tài khoản khi tài khoản đang bị cấm",
                icon: 'error',
            });
        }
        else if (newStatus === 2) {
            Swal.fire({
                text: "Bạn có chắc là muốn xác thực tài khoản này",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ok, tôi đồng ý',
                cancelButtonText: 'Không, tôi đã suy nghĩ lại',
                reverseButtons: true,
            }).then((result) => {
                if (result.value) {
                    onUpdateUserStatus(userInfo.personal.id_user, 2);  
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire({
                        text: 'Quá trình xác thực không được thực hiện',
                        icon: 'error',
                    })
                }
                else {
                }
            })
        }
        else {
            // gọi api
            let text = '';
            if (newStatus === 0) {
                text = 'cấm';
            }
            else {
                text = 'chuyển sang trạng thái "Chờ xác thực"';
            }

            Swal.fire({
                text: "Bạn có chắc là muốn " + text + " đối với tài khoản này",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ok, tôi đồng ý',
                cancelButtonText: 'Không, tôi đã suy nghĩ lại',
                reverseButtons: true,
            }).then((result) => {
                if (result.value) {
                    onUpdateUserStatus(userInfo.personal.id_user, newStatus);
                    // this.setState({ account_status: newStatus });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire({
                        text: 'Thay đổi không được thực hiện',
                        icon: 'error',
                    })
                }
                else {
                }
            })
        }
    }

    handleRejectIdentity(id_user) {
        Swal.fire({
            text: "Tài khoản này không đủ điều kiện, bạn muốn xóa hết các tài liệu này",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ok, tôi đồng ý',
            cancelButtonText: 'Không, tôi đã suy nghĩ lại',
            reverseButtons: true,
        }).then((result) => {
            if (result.value) {
                let {onRejectUserIdentity} = this.props;
                onRejectUserIdentity(id_user);                                    
            } else if (result.dismiss === Swal.DismissReason.cancel) {                
                Swal.fire({
                    text: 'Từ chối xác thực không được thực hiện',
                    icon: 'error',
                })
            }
            else {
            }
        })
    }
    
    render() {
        let {userInfo, isChangingUserStatus, isRejectingUserIdentity} = this.props.UserDetailReducer;
        if(userInfo === null) return '';
        else {
            return (
                <div className="row">
                    <div className="col-4">
                        <div className="profile-img mb-5">
                            <img src={getImageSrc(userInfo.personal.avatarImg, avatarPlaceholder)} alt="avatar-user" />
                        </div>
                    </div>
                    <div className="col-md-8">

                        <div className="profile-head">
                            <div className='row'>
                                <div className='col-6'>
                                    <h5>
                                        {userInfo.personal.fullname.toUpperCase()}
                                    </h5>
                                    <h6>(Ngày tạo tài khoản: {prettierDate(userInfo.personal.createDate)})</h6>
                                </div>
                                <div className='col-6'>
                                    {(
                                        isChangingUserStatus
                                        ?
                                        <div className='w-100 text-center'>
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                        :
                                        <div className="btn-group btn-group-sm" role="group">
                                            <div onClick={() => { if(userInfo.personal.account_status !== -1 ) {this.handleChangeStatus(-1)} }} className={"btn " + (userInfo.personal.account_status === -1 ? 'btn-danger' : 'btn-outline-danger')}>Bị cấm</div>
                                            <div onClick={() => { if(userInfo.personal.account_status !== 1 ) {this.handleChangeStatus(1)} }} className={"btn " + (userInfo.personal.account_status === 1 ? 'btn-primary' : 'btn-outline-primary')}>Chờ xác thực</div>
                                            <div onClick={() => { if(userInfo.personal.account_status !== 2 ) {this.handleChangeStatus(2)} }} className={"btn " + (userInfo.personal.account_status === 2 ? 'btn-success' : 'btn-outline-success')}>Đã xác thực</div>
                                        </div>
                                    )}
                                    
                                </div>
                            </div>
                            <div className='row'>
                                {(
                                    userInfo.personal.isBusinessUser === false
                                    ?
                                    <span className="col proile-rating">Đánh giá từ người tuyển dụng : <span>{userInfo.rating_as_employee.rating_as_employee}/5 <i className="fa fa-star text-warning"></i></span></span>
                                    :
                                    ''
                                )}
                                <span className="col proile-rating">Đánh giá từ người ứng tuyển: <span>{userInfo.rating_as_employer.rating_as_employer}/5 <i className="fa fa-star text-warning"></i></span></span>
                            </div>

                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <div className={'nav-link cursor-pointer ' + (this.state.tab === 1 ? 'active' : '')} id="home-tab" data-toggle="tab"
                                        role="tab" aria-controls="home" aria-selected="true"
                                        onClick={() => { if (this.state.tab !== 1) { this.setState({ tab: 1 }) } }}
                                    >Thông tin cá nhân</div>
                                </li>
                                {(
                                    userInfo.personal.isBusinessUser
                                        ?
                                        <li className="nav-item">
                                            <div className={'nav-link cursor-pointer ' + (this.state.tab === 3 ? 'active' : '')} id="home-tab" data-toggle="tab"
                                                role="tab" aria-controls="home" aria-selected="true"
                                                onClick={() => { if (this.state.tab !== 3) { this.setState({ tab: 3 }) } }}
                                            >Thông tin công ty</div>
                                        </li>
                                        :
                                        ''
                                )}
                                <li className="nav-item">
                                    <div className={'nav-link cursor-pointer ' + (this.state.tab === 2 ? 'active' : '')} id="home-tab" data-toggle="tab"
                                        role="tab" aria-controls="home" aria-selected="true"
                                        onClick={() => { if (this.state.tab !== 2) { this.setState({ tab: 2 }) } }}
                                    >Thông tin xác thực</div>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <div className="tab-content profile-tab" id="myTabContent">

                                <div className={'tab-pane fade ' + (this.state.tab === 1 ? 'show active' : '')} id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Tên người dùng</label>
                                        </div>
                                        <div className="col-3">
                                            <p>{userInfo.personal.fullname}</p>
                                        </div>
                                        <div className="col-3">
                                            <label>Id người dùng</label>
                                        </div>
                                        <div className="col-3">
                                            <p>{userInfo.personal.id_user}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Email</label>
                                        </div>
                                        <div className="col-9">
                                            <p>{userInfo.personal.email}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Số điện thoại</label>
                                        </div>
                                        <div className="col-3">
                                            <p>{userInfo.personal.dial}</p>
                                        </div>
                                        <div className="col-3">
                                            <label>Số CMND</label>
                                        </div>
                                        <div className="col-3">
                                            <p>{userInfo.personal.identity}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Ngày sinh</label>
                                        </div>
                                        <div className="col-9">
                                            <p>{prettierDate(userInfo.personal.dob)}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Địa chỉ</label>
                                        </div>
                                        <div className="col-9 text-truncate">
                                            <p>{userInfo.personal.address}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Giới tính</label>
                                        </div>
                                        <div className="col-9">
                                            <p>{userInfo.personal.gender ? 'Nam' : 'Nữ'}</p>
                                        </div>
                                    </div>
                                </div>

                                {(
                                    userInfo.personal.isBusinessUser
                                        ?
                                        <div className={'tab-pane fade ' + (this.state.tab === 3 ? 'show active' : '')} id="home" role="tabpanel" aria-labelledby="home-tab">
                                            <div className='row'>
                                                <div className="col-3">
                                                    <label>Vai trò</label>
                                                </div>
                                                <div className="col-9">
                                                    <p>{userInfo.company.position}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-3">
                                                    <label>Công ty</label>
                                                </div>
                                                <div className="col-9">
                                                    <p>{userInfo.company.company_name}</p>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className="col-3">
                                                    <label>Email công ty</label>
                                                </div>
                                                <div className="col-9">
                                                    <p>{userInfo.company.company_email}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-3">
                                                    <label>Địa chỉ công ty</label>
                                                </div>
                                                <div className="col-9">
                                                    <p>{userInfo.company.company_address}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-3">
                                                    <label>Số lượng nhân viên</label>
                                                </div>
                                                <div className="col-9">
                                                    <p>{userInfo.company.number_of_employees}</p>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        ''
                                )}

                                <div className={'tab-pane fade ' + (this.state.tab === 2 ? 'show active' : '')} id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row">
                                        <div className='col-4 text-center px-1'>
                                            <p>Ảnh chân dung</p>
                                            <div className='image-field'>
                                                <img src={getImageSrc(userInfo.personal.portrait, avatarPlaceholder)}></img>
                                            </div>
                                        </div>
                                        <div className='col-4 text-center'>
                                            <p>Ảnh trước CMND</p>
                                            <div className='image-field'>
                                                <img src={getImageSrc(userInfo.personal.frontIdPaper, imagePlaceholder)}></img>
                                            </div>
                                        </div>
                                        <div className='col-4 text-center'>
                                            <p>Ảnh sau CMND</p>
                                            <div className='image-field'>
                                                <img src={getImageSrc(userInfo.personal.backIdPaper, imagePlaceholder)}></img>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {(
                                        userInfo.personal.account_status === 1
                                        ?
                                        (
                                            isRejectingUserIdentity
                                            ?
                                            <div className='w-100 text-center'>
                                                <div className="spinner-border text-primary" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            </div>
                                            :
                                            <div className='text-center mt-3'>
                                                <div className='btn btn-secondary' onClick={()=>{this.handleRejectIdentity(userInfo.personal.id_user)}}>
                                                    Từ chối điều khiện xác thực
                                                </div>
                                            </div>   
                                        )                                 
                                        :
                                        ''
                                    )}                                    
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
        onUpdateUserStatus: (id_user, newStatus) => {
            dispatch(udpateUserStatus(id_user, newStatus))
        },
        onRejectUserIdentity: (id_user) => {
            dispatch(rejectUserIdentity(id_user));
        }
    }
}

const UserInfo = withRouter(connect(mapStateToProps, mapDispatchToProps)(UserInfoComponent));
export default UserInfo;