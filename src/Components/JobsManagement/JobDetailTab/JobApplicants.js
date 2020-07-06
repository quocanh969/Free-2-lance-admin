import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { loadApplicantsByJobId } from '../../../Actions/Job.action';
import Swal from 'sweetalert2';
import { getImageSrc } from '../../../Ultis/Helper/HelperFunction';

class JobApplicantsComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            queryType: 0, // 0 - đang duyệt, 1 - đã tuyển
        }
    }

    componentWillMount() {
        let {job} = this.props.JobDetailReducer;
        if(job.id_status === 1 || job.id_status === 0)
        {
            this.loadJobListFunc(1, 8, 0);
        }
        else {
            this.loadJobListFunc(1, 8, 1);
        }        
    }

    loadJobListFunc(page, take, status) {
        let { job } = this.props.JobDetailReducer;
        let { onLoadApplicantByJobId } = this.props;
        onLoadApplicantByJobId(page, take, job.id_job, status)
    }

    handlePagination(pageNum) {
        if (pageNum !== this.props.JobDetailReducer.currentApplicant) {
            this.loadJobListFunc(pageNum, 8, this.state.queryType);
        }
    }

    handleChangeQuery(newQuery) {
        this.setState({ queryType: newQuery }, () => {
            this.loadJobListFunc(1, 8, this.state.queryType);
        });
    }

    handleDetail(applicant) {
        let stt = "<div class='col-7 text-success'>Đã tuyển</div>";
        if (this.state.queryType === 0) {
            stt = "<div class='col-7 text-danger'>Đang tuyển</div>";
        }
        Swal.fire({
            title: '<b>Chi tiết đơn ứng tuyển</b>',
            html:
                `<div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Người ứng tuyển :</label>
                        <div class='col-7'>${applicant.fullname}</div>                    
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Email :</label>
                        <div class='col-7'>${applicant.email}</div>                    
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Số điện thoại :</label>
                        <div class='col-7'>${applicant.dial}</div>
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Lương mong muốn :</label>
                        <div class='col-7'>${applicant.proposed_price}</div>                    
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Tình trạng :</label>
                        ${stt}
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Tự giới thiệu :</label>
                        <div class='col-7'>${applicant.introduction_string}</div>
                    </div>                    
                </div>`,
            showCloseButton: true,
            showConfirmButton: false,
            focusConfirm: false
        })
    }

    handleViewAttachment(attachment) {
        if (attachment && attachment !== 'Pw===') {
            let keyFile = attachment.substring(0, 5).toUpperCase();
            var modal = document.getElementById("cv-modal-dialog");
            if (keyFile === "IVBOR" || keyFile === "/9J/4") {
                let image = document.createElement("IMG");
                image.className = "modal-content";
                image.src = getImageSrc(attachment);
                modal.innerHTML = "";
                modal.appendChild(image);
            } else if (keyFile === "JVBER") {
                let iframe = document.createElement("iframe");
                iframe.className = "modal-content";
                iframe.style.height = "90vh";
                iframe.src = "data:application/pdf;base64," + attachment;
                modal.innerHTML = "";
                modal.appendChild(iframe);
            }
        } 
        else if(attachment === 'PW===') {
            Swal.fire({
                title: "Người dùng không gửi tài liệu",
                text: "Vui lòng thử lại sau",
                icon: "error",
                confirmButtonText: "Ok!",
            });
        }
        else {
            Swal.fire({
                title: "Không đọc được tài liệu",
                text: "Vui lòng thử lại sau",
                icon: "error",
                confirmButtonText: "Ok!",
            });
        }
    }

    renderUserList(applicants, total) {
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
        else if(applicants.length > 0) {
            applicants.forEach((e, index) => {
                content.push(
                    <tr key={index}>
                        <td>{e.id_user}</td>
                        <td><div className='text-truncate' style={{ width: '150px' }}>{e.fullname}</div></td>
                        <td><div className='text-truncate' style={{ width: '180px' }}>{e.email}</div></td>
                        <td>{e.dial}</td>
                        <td className='text-center' style={{ width: '160px' }}>
                            <div data-toggle="modal" data-target="#CVModal" onClick={()=>{this.handleViewAttachment(e.attachment)}}><i className='icon-material-outline-file-copy cursor-pointer text-primary mb-1'></i></div>
                        </td>
                        <td className='text-center' style={{ width: '150px' }}>
                            <NavLink to={'/user-detail/id=' + e.id_user}><i className='icon-feather-user cursor-pointer'></i></NavLink>
                        </td>
                        <td className='text-center' style={{ width: '80px' }}>
                            <div onClick={() => { this.handleDetail(e) }}><i className='icon-feather-eye cursor-pointer text-primary mb-1'></i></div>
                        </td>
                    </tr>);

            })
        }
        else {
            content.push(
                <tr key={0}>
                    <td colSpan='7' className='p-5'>
                        Danh sách người tham gia rỗng !!
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
        let { job, applicants, totalApplicants, currentApplicant } = this.props.JobDetailReducer;
        let totalPage = Math.ceil(totalApplicants / 8);
        
        if(job === null) return '';
        else {
            return (
                <div>
                    {(
                        job.id_status === 1 || job.id_status === 0
                        ?
                        <div className='btn-group btn-group-sm my-2'>
                            <div onClick={() => { if (this.state.queryType !== 0) { this.handleChangeQuery(0) } }} className={"btn " + (this.state.queryType === 0 ? 'btn-secondary' : 'btn-outline-secondary')}>Đang duyệt</div>
                            <div onClick={() => { if (this.state.queryType !== 1) { this.handleChangeQuery(1) } }} className={"btn " + (this.state.queryType === 1 ? 'btn-secondary' : 'btn-outline-secondary')}>Đã tuyển</div>
                        </div>
                        :
                        ''
                    )}                
                    {/* Table */}
                    
                    <div className="table-responsive">
                        <table className="col-12 table" id="dataTable" width="100%" cellSpacing={0} >
                            <thead className="thead-dark">
                                <tr>
                                    <th>Id</th>
                                    <th>Tên</th>
                                    <th>Email</th>
                                    <th>Sđt</th>
                                    <th>Tài liệu đính kèm</th>
                                    <th>Trang cá nhân</th>
                                    <th>Chi tiết</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderUserList(applicants, totalApplicants)}
                            </tbody>
                        </table>
    
                    </div>
    
                    {/* Pagination */}
                    {(
                        totalApplicants === 0
                            ?
                            ''
                            :
                            <nav aria-label="...">
                                <ul className="pagination">
                                    <li className={"pagination-item " + ((currentApplicant === 1 || totalPage - currentApplicant < 3) && "d-none")}>
                                        <div className="cursor-pointer page-link" onClick={() => { this.handlePagination(currentApplicant - 1); }}>
                                            <i className="icon-material-outline-keyboard-arrow-left" />
                                        </div>
                                    </li>
                                    {this.renderPagination(currentApplicant, totalPage)}
                                    <li className={"pagination-item " + (totalPage - currentApplicant < 3 && "d-none")}>
                                        <div className="cursor-pointer page-link" onClick={() => { this.handlePagination(currentApplicant + 1); }}>
                                            <i className="icon-material-outline-keyboard-arrow-right" />
                                        </div>
                                    </li>
                                </ul>
                            </nav>
                    )}
    
                    <div id="CVModal" className="modal fade" role="dialog">
                        <div id="cv-modal-dialog" className="modal-dialog modal-xl"></div>
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
        onLoadApplicantByJobId: (page, take, id, id_status) => {
            dispatch(loadApplicantsByJobId(page, take, id, id_status));
        }
    }
}

const JobApplicants = withRouter(connect(mapStateToProps, mapDispatchToProps)(JobApplicantsComponent));
export default JobApplicants;