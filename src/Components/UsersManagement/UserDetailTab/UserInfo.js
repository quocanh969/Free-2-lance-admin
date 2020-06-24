import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getImageSrc, prettierDate } from '../../../Ultis/Helper/HelperFunction';

import avatarPlaceholder from '../../../Assets/images/avatar_placeholder.png';
import imagePlaceholder from '../../../Assets/images/image-placeholder.jpg';

import Swal from 'sweetalert2';

class UserInfoComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: 1,
            id_user: 1,
            fullname: 'John Cena',
            dob: new Date('19/05/2019'),
            email: 'tranquocanh858@gmail.com',
            dial: '021312412',
            address: '124 đường số 1A',
            identity: '01234567891011',
            portrait: null,
            frontIdPaper: null,
            backIdPaper: null,
            createDate: new Date('19/05/2019'),
            isBusinessUser: true,
            gender: true,
            avatarImg: null,
            account_status: 1,
            rating: 4.5,
            company_name: 'Công ty xăng dầu TPHCM',
            position: 'CEO',
            company_address: '124 đường số 1A',
            company_email: 'xangdau@gmail.com',
            number_of_employees: 200,
        }
    }

    handleChangeStatus(newStatus) {
        if (this.state.account_status === newStatus) {
            return;
        }
        else if(newStatus === 2)
        {
            Swal.fire({
                text: 'Bạn không thể thay đổi trạng thái của người dùng này',
                icon: 'warning',
            });
        }
        else {
            // gọi api
            let text = '';
            if (newStatus === 0) {
                text = 'cấm';
            }
            else {
                text = 'khôi phục';
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
                    Swal.fire({
                        text: 'Thay đổi thành công',
                        icon: 'success',
                    });
                    this.setState({ account_status: newStatus });
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

render() {
    return (
        <div className="row">
            <div className="col-4">
                <div className="profile-img mb-5">
                    <img src={getImageSrc(null, avatarPlaceholder)} alt="avatar-user" />
                </div>
            </div>
            <div className="col-md-8">

                <div className="profile-head">
                    <div className='d-flex justify-content-between'>
                        <div>
                            <h5>
                                {this.state.fullname.toUpperCase()}
                            </h5>
                            <h6>(Ngày tạo tài khoản: {prettierDate(this.state.createDate)})</h6>
                        </div>
                        <div>
                            <div className="btn-group btn-group-sm" role="group">
                                <div onClick={() => { this.handleChangeStatus(-1) }} className={"btn " + (this.state.account_status === -1 ? 'btn-danger' : 'btn-outline-danger')}>Bị cấm</div>
                                <div onClick={() => { this.handleChangeStatus(1) }} className={"btn " + (this.state.account_status === 1 ? 'btn-primary' : 'btn-outline-primary')}>Chờ xác thực</div>
                                <div onClick={() => { this.handleChangeStatus(2) }} className={"btn " + (this.state.account_status === 2 ? 'btn-success' : 'btn-outline-success')}>Đã xác thực</div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <span className="col proile-rating">Đánh giá từ người tuyển dụng : <span>{this.state.rating}/10 <i className="fa fa-star text-warning"></i></span></span>
                        <span className="col proile-rating">Đánh giá từ người ứng tuyển: <span>{this.state.rating}/10 <i className="fa fa-star text-warning"></i></span></span>
                    </div>

                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <div className={'nav-link cursor-pointer ' + (this.state.tab === 1 ? 'active' : '')} id="home-tab" data-toggle="tab"
                                role="tab" aria-controls="home" aria-selected="true"
                                onClick={() => { if (this.state.tab !== 1) { this.setState({ tab: 1 }) } }}
                            >Thông tin cá nhân</div>
                        </li>
                        {(
                            this.state.isBusinessUser
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
                                    <p>{this.state.fullname}</p>
                                </div>
                                <div className="col-3">
                                    <label>Id người dùng</label>
                                </div>
                                <div className="col-3">
                                    <p>{this.state.id_user}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <label>Email</label>
                                </div>
                                <div className="col-9">
                                    <p>{this.state.email}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <label>Số điện thoại</label>
                                </div>
                                <div className="col-3">
                                    <p>{this.state.dial}</p>
                                </div>
                                <div className="col-3">
                                    <label>Số CMND</label>
                                </div>
                                <div className="col-3">
                                    <p>{this.state.identity}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <label>Ngày sinh</label>
                                </div>
                                <div className="col-9">
                                    <p>{prettierDate(this.state.dob)}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <label>Địa chỉ</label>
                                </div>
                                <div className="col-9 text-truncate">
                                    <p>{this.state.address}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <label>Giới tính</label>
                                </div>
                                <div className="col-9">
                                    <p>{this.state.gender ? 'Nam' : 'Nữ'}</p>
                                </div>
                            </div>
                        </div>

                        {(
                            this.state.isBusinessUser
                                ?
                                <div className={'tab-pane fade ' + (this.state.tab === 3 ? 'show active' : '')} id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className='row'>
                                        <div className="col-3">
                                            <label>Vai trò</label>
                                        </div>
                                        <div className="col-9">
                                            <p>{this.state.position}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Công ty</label>
                                        </div>
                                        <div className="col-9">
                                            <p>{this.state.company_name}</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-3">
                                            <label>Email công ty</label>
                                        </div>
                                        <div className="col-9">
                                            <p>{this.state.company_email}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Địa chỉ công ty</label>
                                        </div>
                                        <div className="col-9">
                                            <p>{this.state.company_address}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Số lượng nhân viên</label>
                                        </div>
                                        <div className="col-9">
                                            <p>{this.state.number_of_employees}</p>
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
                                        <img src={getImageSrc(this.state.portrait, avatarPlaceholder)}></img>
                                    </div>
                                </div>
                                <div className='col-4 text-center'>
                                    <p>Ảnh trước CMND</p>
                                    <div className='image-field'>
                                        <img src={getImageSrc(this.state.portrait, imagePlaceholder)}></img>
                                    </div>
                                </div>
                                <div className='col-4 text-center'>
                                    <p>Ảnh sau CMND</p>
                                    <div className='image-field'>
                                        <img src={getImageSrc(this.state.portrait, imagePlaceholder)}></img>
                                    </div>
                                </div>
                            </div>
                        </div>

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

const UserInfo = withRouter(connect(mapStateToProps, mapDispatchToProps)(UserInfoComponent));
export default UserInfo;