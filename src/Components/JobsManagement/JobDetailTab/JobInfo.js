import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getImageSrc, prettierDate, prettierNumber } from '../../../Ultis/Helper/HelperFunction';
import { withRouter } from 'react-router-dom';

import imagePlaceholder from '../../../Assets/images/image-placeholder.jpg';
import JobApplicants from './JobApplicants';

import Swal from 'sweetalert2';
import { udpateJobStatus } from '../../../Actions/Job.action';

class JobInfoComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tab: 1,
        }
    }

    handleChangeStatus(newStatus) {
        let {job} = this.props.JobDetailReducer;

        if(job.id_status === newStatus)
        {
            return;
        }
        else
        {
            // gọi api
            let text = '';
            if(newStatus === 0)
            {
                text = 'gỡ';
            }
            else
            {
                text = 'khôi phục';
            }

            Swal.fire({
                text: "Bạn có chắc là muốn " + text + " công việc này",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ok, tôi đồng ý',
                cancelButtonText: 'Không, tôi đã suy nghĩ lại',
                reverseButtons: true,
            }).then((result) => {
                if (result.value) {
                    let{onUpdateJobStatus} = this.props;
                    onUpdateJobStatus(job.id_job, newStatus);
                    Swal.fire({
                        text: 'Thay đổi thành công',
                        icon: 'success',
                    });                    
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

    renderImages(images) {
        let content = [];
        images.forEach((e, index) => {
            content.push(
                <div className='col-3 p-1' key={index}>
                    <div className='image-field text-center'>
                        <img src={getImageSrc(e, imagePlaceholder)}></img>
                    </div>                    
                </div>
            )
        })
        return content;
    }

    renderTags(tags) {
        let content = [];
        tags.forEach((e, index) => {
            content.push(
                <span key={index}>{e}, &nbsp;</span>
            )
        })

        return content;
    }

    render() {
        let {job} = this.props.JobDetailReducer;
        return (
            <div>
                <div className="profile-head">
                    <div className='row'>
                        <div className='col-7'>
                            <h5>
                                {job.title.toUpperCase()}
                            </h5>
                            {(
                                job.id_status === 0
                                ?
                                ''
                                :
                                (
                                    job.id_status === 1
                                    ?
                                    <h6>( Ngày đăng: {prettierDate(job.post_date)} - Ngày hết hạn: {prettierDate(job.expire_date)} )</h6>
                                    :
                                    (
                                        job.job_type
                                        ?
                                        <h6>( Ngày hết hạn: {prettierDate(job.deadline)} )</h6>
                                        :
                                        <h6>( Ngày bắt đầu: {prettierDate(job.start_date)} - Ngày kết thúc: {prettierDate(job.end_date)} )</h6>
                                    )
                                )
                            )}                            
                        </div>
                        <div className='col-5'>
                            <div className="btn-group btn-group-sm" role="group">
                                <div onClick={() => { this.handleChangeStatus(0) }} className={"btn " + (job.id_status === 0 ? 'btn-danger' : 'btn-outline-danger')}>Bị gỡ</div>
                                <div onClick={() => { this.handleChangeStatus(1) }}className={"btn " + (job.id_status === 1 ? 'btn-primary' : 'btn-outline-primary')}>Đang tuyển</div>
                                <div className={"btn " + (job.id_status === 2 ? 'btn-warning' : 'btn-outline-warning')}>Đang thực hiện</div>
                                <div className={"btn " + (job.id_status === 3 ? 'btn-success' : 'btn-outline-success')}>Hoàn thành</div>
                            </div>
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
                            >{(job.id_status === 1 || job.id_status === 0? 'Danh sách người ứng tuyển' : 'Danh sách người tham gia')}</div>
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
                                    <p>{job.name_employer}</p>
                                </div>
                                <div className="col-2">
                                    <label>Email</label>
                                </div>
                                <div className="col-4">
                                    <p>{job.email}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2">
                                    <label>Mức lương</label>
                                </div>
                                <div className="col-4">
                                    <p>{prettierNumber(job.salary)} VNĐ</p>
                                </div>
                                <div className="col-2">
                                    <label>Chủ đề</label>
                                </div>
                                <div className="col-4">
                                    <p>{job.topic_name}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2">
                                    <label>Số lượng cần tuyển</label>
                                </div>
                                <div className="col-4">
                                    <p>{job.vacancy}</p>
                                </div>
                                <div className="col-2">
                                    <label>Danh sách tags</label>
                                </div>
                                <div className="col-4">
                                    <p>{this.renderTags(job.tags)}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2">
                                    <label>Khu vực</label>
                                </div>
                                <div className="col-4">
                                    <p>{job.province_name}</p>
                                </div>
                                <div className="col-2">
                                    <label>Quận</label>
                                </div>
                                <div className="col-4">
                                    <p>{job.district_name}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2">
                                    <label>Tính chất công việc</label>
                                </div>
                                <div className="col-10">
                                    <p>
                                        {job.job_type ? 'Công việc thời vụ' : 'Công việc theo sản phẩm'},&nbsp;&nbsp;
                                        {job.dealable ? 'Cho phép đấu giá' : 'Lương cứng'},&nbsp;&nbsp;
                                        {job.isOnline ? 'Online' : 'Offline'},&nbsp;&nbsp;
                                        {job.isCompany ? 'Trực thuộc công ty' : 'Cá nhân'}
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2">
                                    <label>Địa điểm</label>
                                </div>
                                <div className="col-10">
                                    <p>{job.address}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2">
                                    <label>Mô tả công việc</label>
                                </div>
                                <div className="col-10">
                                    <p>{job.description}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2">
                                    <label>Yêu cầu công việc</label>
                                </div>
                                <div className="col-10">
                                    <p>{job.requirement}</p>
                                </div>
                            </div>
                            
                        </div>

                        
                        <div className={'tab-pane fade ' + (this.state.tab === 3 ? 'show active' : '')} id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="row">
                                {this.renderImages(job.imgs)}
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
        onUpdateJobStatus: (id_job, id_status) => {
            dispatch(udpateJobStatus(id_job, id_status));
        }
    }
}

const JobInfo = withRouter(connect(mapStateToProps, mapDispatchToProps)(JobInfoComponent));
export default JobInfo;