import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { prettierNumber, prettierDate } from '../../Ultis/Helper/HelperFunction';

import Swal from 'sweetalert2';

class PendingJobsComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            queryType: 1, // 1 - đang tuyển, 2 - đang thực hiên, 3 - đã hoàn thành
        }
    }

    loadJobListFunc(page) {

    }

    handlePagination(pageNum) {
        // if (pageNum !== this.props.EmployerReducer.currentApplyingPage) {
        //     this.loadJobListFunc(pageNum);
        // }
    }

    handleChangeStatus(id_job, current_value) {
        let val = Number.parseInt(document.getElementById('select-status-' + id_job).value);

        if (current_value === val) return;

        if (val === 0) {
            Swal.fire({
                text: "Bạn có chắc là muốn gỡ công việc này xuống !",
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
                    document.getElementById('select-status-' + id_job).value = current_value;
                }
                else {
                    document.getElementById('select-status-' + id_job).value = current_value;
                }
            })
        }
        else {
            Swal.fire({
                text: 'Bạn không thể thay đổi trạng thái này của công việc',
                icon: 'warning',
            });
            document.getElementById('select-status-' + id_job).value = current_value;
        }

    }

    handleSearchUser() {
        let searchStr = document.getElementById('job-search-input').value;
        if (searchStr === '') {
            return;
        }
        else {
            // gọi api
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
            <td><div className='text-truncate' style={{ width: '250px' }}>Đấm nhau với The Rock và Bốc bát họ</div></td>
            <td><div className='text-truncate' style={{ width: '100px' }}>Bốc bát họ</div></td>
            <td>{prettierNumber(200000)} VNĐ</td>
            <td>{prettierDate(new Date())}</td>
            <td>{prettierDate(new Date())}</td>
            <td>
                <select id={'select-status-' + 1} defaultValue={1} onChange={()=>{this.handleChangeStatus(1, 1)}}>
                    <option value={0}>Bị gở</option>
                    <option value={1}>Đang tuyển</option>
                    <option value={2}>Đang thực hiện</option>
                    <option value={3}>Hoàn thành</option>
                </select>
            </td>
            <td className='text-center'>
                <i className='icon-feather-eye cursor-pointer'></i>
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
        let { totalApplyingJobs, currentApplyingPage } = {totalApplyingJobs: 8, currentApplyingPage: 1};
        let totalPage = Math.ceil(totalApplyingJobs / 4);

        return (
            <div className="container-fluid">
                {/* Page Heading */}
                <h1 className="h3 mb-2 text-gray-800">Quản lý danh sách công việc</h1>
                <p className="mb-4">
                    Danh sách các công việc hiện tại
                </p>
                {/* Userlist DataTales Example */}
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary"><i className="icon-material-outline-business-center" /> Danh sách công việc</h6>
                    </div>
                    <div className="card-body">
                        {/* Headline */}
                        <div className="row my-1">
                            <div className="col-9 btn-group-sm" role="group">
                                <div onClick={() => { this.setState({ queryType: 1 }) }} className={"btn " + (this.state.queryType === 1 ? 'btn-primary' : 'btn-outline-primary')}>Tất cả</div>
                                <div onClick={() => { this.setState({ queryType: 2 }) }} className={"btn " + (this.state.queryType === 2 ? 'btn-danger' : 'btn-outline-danger')}>Đang tuyển</div>
                                <div onClick={() => { this.setState({ queryType: 4 }) }} className={"btn " + (this.state.queryType === 4 ? 'btn-secondary' : 'btn-outline-secondary')}>Đang thực hiện</div>
                                <div onClick={() => { this.setState({ queryType: 5 }) }} className={"btn " + (this.state.queryType === 5 ? 'btn-success' : 'btn-outline-success')}>Đã hoàn thành</div>
                            </div>
                            <div className="col-3 text-right">
                                <div className="input-group mb-3">
                                    <input type="text" id="job-search-input" className="form-control" placeholder="Tìm kiếm theo tên .." />
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
                                        <th>Công việc</th>
                                        <th>Chủ đề</th>
                                        <th>Tiền lương</th>
                                        <th>Ngày đăng</th>
                                        <th>Hết hạn</th>
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
  
  const PendingJobs = withRouter(connect(mapStateToProps, mapDispatchToProps)(PendingJobsComponent));
  export default PendingJobs;