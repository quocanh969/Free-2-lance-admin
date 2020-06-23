import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getImageSrc, prettierDate, prettierNumber } from '../../../Ultis/Helper/HelperFunction';
import { withRouter } from 'react-router-dom';

import imagePlaceholder from '../../../Assets/images/image-placeholder.jpg';
import JobApplicants from './JobApplicants';

class JobInfoComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tab: 1,         
            id_job: 1,
            employer: 1,
            title: 'Đấm nhau',
            salary: 200000,
            job_topic: 1,
            area_province: 7,
            area_district: 1,
            address: '124 đường số 1A',
            description: 'Copyright Disclaimer All is part of a hobby & passion to share music with the community. All music used in the creation of this video are the intellectual property of those who owns it. No copyright infringement is, or will be intended on this channel whatsoever. If you wish to have the video removed, please contact the email at the bottom of this description. Your content will be promptly removed within 24 hours time.',
            post_date: new Date(),
            expire_date: new Date(),
            dealable: true,
            job_type: true,// 0 - công việc thời vụ, 1 - công việc theo sp
            isOnline: true,
            isCompany: true,
            vacancy: 4,
            requirement: 'Copyright Disclaimer All is part of a hobby & passion to share music with the community. All music used in the creation of this video are the intellectual property of those who owns it. No copyright infringement is, or will be intended on this channel whatsoever. If you wish to have the video removed, please contact the email at the bottom of this description. Your content will be promptly removed within 24 hours time.',
            id_status: 1,

            fullname: 'John Cena',
            email: 'tranquocanh858@gmail.com',

            images: ['','',''],

            tags: [
                {
                    id: 1,
                    tag_name: 'thời vụ',
                },
                {
                    id: 1,
                    tag_name: 'thời vụ',
                },
                {
                    id: 1,
                    tag_name: 'thời vụ',
                },
                {
                    id: 1,
                    tag_name: 'thời vụ',
                },
            ]
        }
    }

    handleChangeStatus(newStatus) {
        if(this.state.account_status === newStatus)
        {
            return;
        }
        else
        {
            // gọi api
            // alert
            this.setState({account_status: newStatus});
        }
    }

    renderImages(images) {
        let content = [];
        images.forEach((e, index) => {
            content.push(
                <div className='col-3 p-1' key={index}>
                    <div className='image-field text-center'>
                        <img src={getImageSrc(null, imagePlaceholder)}></img>
                    </div>                    
                </div>
            )
        })
        return content;
    }

    renderTags(tags) {
        let content = [];
        console.log(tags);
        tags.forEach((e, index) => {
            content.push(
                <span key={index}>{e.tag_name}, &nbsp;</span>
            )
        })

        return content;
    }

    render() {
        return (
            <div>
                <div className="profile-head">
                    <div className='d-flex justify-content-between'>
                        <div>
                            <h5>
                                {this.state.title.toUpperCase()}
                            </h5>
                            {(
                                this.state.id_status === 0
                                ?
                                ''
                                :
                                (
                                    this.state.id_status === 1
                                    ?
                                    <h6>( Ngày đăng: {prettierDate(this.state.post_date)} - Ngày hết hạn: {prettierDate(this.state.expire_date)} )</h6>
                                    :
                                    (
                                        this.state.job_type
                                        ?
                                        <h6>( Ngày hết hạn: {prettierDate(this.state.deadline)} )</h6>
                                        :
                                        <h6>( Ngày bắt đầu: {prettierDate(this.state.start_date)} - Ngày kết thúc: {prettierDate(this.state.end_date)} )</h6>
                                    )
                                )
                            )}                            
                        </div>
                        <div className="btn-group-sm" role="group">
                            <div onClick={() => { this.handleChangeStatus(0) }} className={"btn " + (this.state.id_status === 0 ? 'btn-danger' : 'btn-outline-danger')}>Bị gỡ</div>
                            <div className={"btn " + (this.state.id_status === 1 ? 'btn-primary' : 'btn-outline-primary')}>Đang tuyển</div>
                            <div className={"btn " + (this.state.id_status === 2 ? 'btn-success' : 'btn-outline-success')}>Đang thực hiện</div>
                            <div className={"btn " + (this.state.id_status === 3 ? 'btn-primary' : 'btn-outline-primary')}>Hoàn thành</div>
                        </div>
                    </div>

                    <ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
                        <li className="nav-item">
                            <div className={'nav-link cursor-pointer ' + (this.state.tab === 1 ? 'active' : '')} id="home-tab" data-toggle="tab"
                                role="tab" aria-controls="home" aria-selected="true"
                                onClick={() => { if (this.state.tab !== 1) { this.setState({ tab: 1 }) } }}
                            >Thông tin công việc</div>
                        </li>
                        <li className="nav-item">
                            <div className={'nav-link cursor-pointer ' + (this.state.tab === 3 ? 'active' : '')} id="home-tab" data-toggle="tab"
                                role="tab" aria-controls="home" aria-selected="true"
                                onClick={() => { if (this.state.tab !== 3) { this.setState({ tab: 3 }) } }}
                            >Hình ảnh liên quan đến công việc</div>
                        </li>
                        <li className="nav-item">
                            <div className={'nav-link cursor-pointer ' + (this.state.tab === 2 ? 'active' : '')} id="home-tab" data-toggle="tab"
                                role="tab" aria-controls="home" aria-selected="true"
                                onClick={() => { if (this.state.tab !== 2) { this.setState({ tab: 2 }) } }}
                            >Danh sách người ứng tuyển</div>
                        </li>
                    </ul>
                </div>

                <div className='mt-0'>
                    <div className="tab-content profile-tab" id="myTabContent">

                        <div className={'tab-pane fade ' + (this.state.tab === 1 ? 'show active' : '')} id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="row">
                                <div className="col-2">
                                    <label>Tên người đăng</label>
                                </div>
                                <div className="col-4">
                                    <p>{this.state.fullname}</p>
                                </div>
                                <div className="col-2">
                                    <label>Email</label>
                                </div>
                                <div className="col-4">
                                    <p>{this.state.email}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2">
                                    <label>Mức lương</label>
                                </div>
                                <div className="col-10">
                                    <p>{prettierNumber(this.state.salary)} VNĐ</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2">
                                    <label>Số lượng cần tuyển</label>
                                </div>
                                <div className="col-4">
                                    <p>{this.state.vacancy}</p>
                                </div>
                                <div className="col-2">
                                    <label>Danh sách tags</label>
                                </div>
                                <div className="col-4">
                                    <p>{this.renderTags(this.state.tags)}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2">
                                    <label>Khu vực</label>
                                </div>
                                <div className="col-4">
                                    <p>{this.state.area_province}</p>
                                </div>
                                <div className="col-2">
                                    <label>Quận</label>
                                </div>
                                <div className="col-4">
                                    <p>{this.state.area_district}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2">
                                    <label>Tính chất công việc</label>
                                </div>
                                <div className="col-10">
                                    <p>
                                        {this.state.job_type ? 'Công việc thời vụ' : 'Công việc theo sản phẩm'},&nbsp;&nbsp;
                                        {this.state.dealable ? 'Cho phép đấu giá' : 'Lương cứng'},&nbsp;&nbsp;
                                        {this.state.isOnline ? 'Online' : 'Offline'},&nbsp;&nbsp;
                                        {this.state.isCompany ? 'Trực thuộc công ty' : 'Cá nhân'}
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2">
                                    <label>Địa điểm</label>
                                </div>
                                <div className="col-10">
                                    <p>{this.state.address}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2">
                                    <label>Mô tả công việc</label>
                                </div>
                                <div className="col-10">
                                    <p>{this.state.description}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2">
                                    <label>Yêu cầu công việc</label>
                                </div>
                                <div className="col-10">
                                    <p>{this.state.requirement}</p>
                                </div>
                            </div>
                            
                        </div>

                        
                        <div className={'tab-pane fade ' + (this.state.tab === 3 ? 'show active' : '')} id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="row">
                                {this.renderImages(this.state.images)}
                            </div>
                        </div>

                        <div className={'tab-pane fade ' + (this.state.tab === 2 ? 'show active' : '')} id="home" role="tabpanel" aria-labelledby="home-tab">
                            <JobApplicants></JobApplicants>
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

const JobInfo = withRouter(connect(mapStateToProps, mapDispatchToProps)(JobInfoComponent));
export default JobInfo;