import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Swal from 'sweetalert2';
import { prettierDate } from '../../Ultis/Helper/HelperFunction';
import { setJobReportStatus } from '../../Services/Report.service';
import { loadJobReportList } from '../../Actions/Report.action';
import { history } from '../../Ultis/history/history';
import { getRefundForEmployer } from '../../Services/Transaction.service';

class JobReportsComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            queryType: 0, // 1 - tất cả, 2 - chưa giải quyết, 3 - đã giải quyết
            queryName: '',
        }
    }

    componentWillMount() {
        this.loadJobListFunc(1, this.state.queryType, this.state.queryName);
    }

    loadJobListFunc(page, status, queryName) {
        let { onLoadJobReportList } = this.props;
        onLoadJobReportList(page, 8, status, queryName);
    }

    handlePagination(pageNum) {
        if (pageNum !== this.props.ReportsReducer.currentJobReportsPage) {
            this.loadJobListFunc(pageNum, this.state.queryType, this.state.queryName);
        }
    }

    handleFilter(newType) {
        this.setState({ queryType: newType }, () => {
            this.loadJobListFunc(1, this.state.queryType, this.state.queryName);
        })
    }

    handleSearchUser() {
        let searchStr = document.getElementById('user-search-input').value;
        if (searchStr === '') {
            return;
        }
        else {
            this.setState({ queryName: searchStr }, () => {
                this.loadJobListFunc(1, this.state.queryType, this.state.queryName);
            });
        }
    }

    handleChangeStatus(e) {
        Swal.fire({
            text: "Bạn đã giải quyết xong khiếu nại này, vui lòng nhập phương thức của bạn",
            input: 'radio',
            inputOptions: {
                'Hoàn tiền': 'Hoàn tiền',
                'Không hoàn tiền': 'Không hoàn tiền'
            },
            showCancelButton: true,
            confirmButtonText: 'Ok, tôi đồng ý',
            cancelButtonText: 'Không, tôi đã suy nghĩ lại',
            reverseButtons: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'Bạn vẫn chưa điền phương thức giải quyết !'
                }
            }
        }).then((result) => {
            if (result.value) {
                if (result.value === 'Hoàn tiền') {
                    Swal.fire({
                        text: "Vui lòng chọn mức % muốn hoàn tiền",
                        input: 'select',
                        inputOptions: {
                            10: '10%',
                            15: '15%',
                            20: '20%',
                            25: '25%',
                            30: '30%',
                            35: '35%',
                            40: '40%',
                            45: '45%',
                            50: '50%',
                            55: '55%',
                            60: '60%',
                            65: '65%',
                            70: '70%',
                            75: '75%',
                            80: '80%',
                            85: '85%',
                            90: '90%'
                        },
                        showCancelButton: true,
                        confirmButtonText: 'Ok, tôi đồng ý',
                        cancelButtonText: 'Không, tôi đã suy nghĩ lại',
                        reverseButtons: true,
                        inputValidator: (value) => {
                            if (!value) {
                                return 'Bạn vẫn chọn mức phần trăm !'
                            }
                        }
                    }).then(result => {
                        if (result.value) {
                            let refundPercentage = result.value;
                            let leftover = e.amount * (100 - refundPercentage) / 100;
                            Swal.fire({
                                text: "Vui lòng nhập nguyên nhân hoàn tiền",
                                input: 'textarea',
                                showCancelButton: true,
                                confirmButtonText: 'Ok, tôi đồng ý',
                                cancelButtonText: 'Không, tôi đã suy nghĩ lại',
                                reverseButtons: true,
                                inputValidator: (value) => {
                                    if (!value) {
                                        return 'Bạn vẫn chưa điền cách thức giải quyết !'
                                    }
                                }
                            }).then((res) => {
                                if (res.value) {    
                                    let {onRequestChangeStt} = this.props;
                                    onRequestChangeStt();                        
                                    getRefundForEmployer(e.id_report, e.id_applicant, e.id_transaction, e.amount, refundPercentage, leftover, e.content, res.value).then(res => {
                                        if (res.data.code === '200') {
                                            if(res.data.data.code === 1) {
                                                this.loadJobListFunc(1, this.state.queryType, this.state.queryName);
                                                Swal.fire({
                                                    text: 'Hoàn tiền thành công',
                                                    icon: 'success',
                                                })   
                                            }    
                                            else if(res.data.data.code === 0) {
                                                Swal.fire({
                                                    text: 'Thanh toán đã được rút',
                                                    icon: 'error',
                                                })
                                            }                                
                                            else {
                                                Swal.fire({
                                                    text: 'Có lỗi trong quá trình liên kết với server của ví Momo',
                                                    icon: 'error',
                                                })
                                            }
                                        }
                                        else {
                                            Swal.fire({
                                                text: 'Hoàn tiền thất bại',
                                                icon: 'error',
                                            })
                                        }
                                    }).catch(err => {
                                        console.log(err);
                                        Swal.fire({
                                            text: 'Server gặp sự cố',
                                            icon: 'error',
                                        })
                                    })
                                } else if (res.dismiss === Swal.DismissReason.cancel) {
                                    Swal.fire({
                                        text: 'Thay đổi không được thực hiện',
                                        icon: 'error',
                                    })
                                }
                                else {
                                }
                            })
                            //(e.id_applicant, e.id_transaction, e.amount, refundPercentage, leftover, e.content)
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
                else {
                    Swal.fire({
                        text: "Vui lòng nhập nguyên nhân không hoàn tiền",
                        input: 'textarea',
                        showCancelButton: true,
                        confirmButtonText: 'Ok, tôi đồng ý',
                        cancelButtonText: 'Không, tôi đã suy nghĩ lại',
                        reverseButtons: true,
                        inputValidator: (value) => {
                            if (!value) {
                                return 'Bạn vẫn chưa điền cách thức giải quyết !'
                            }
                        }
                    }).then((res) => {
                        if (res.value) {                     
                            let {onRequestChangeStt} = this.props;
                            onRequestChangeStt();       
                            setJobReportStatus(e.id_report, 1, `${result.value}. Nguyên nhân: ${res.value}`).then(res => {
                                if (res.data.code === '106') {
                                    this.loadJobListFunc(1, this.state.queryType, this.state.queryName);
                                    Swal.fire({
                                        text: 'Khồng hoàn tiền cho giao dịch này',
                                        icon: 'success',
                                    })
                                }
                                else {
                                    Swal.fire({
                                        text: 'Thay đổi thất bại, vui lòng thử lại sau',
                                        icon: 'error',
                                    })
                                }
                            }).catch(err => {
                                Swal.fire({
                                    text: 'Server có vấn đề, vui lòng thử lại sau',
                                    icon: 'error',
                                })
                            })
                        } else if (res.dismiss === Swal.DismissReason.cancel) {
                            Swal.fire({
                                text: 'Thay đổi không được thực hiện',
                                icon: 'error',
                            })
                        }
                        else {
                        }
                    })
                }
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

    handleDetail(report) {
        let statusText = `<div class='col-7 text-danger'>Chờ giải quyết</div>`;
        let solutionText = ``;

        if (report.status === 1) {
            statusText = `<div class='col-7 text-success'>Đã giải quyết</div>`
            solutionText = `<div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                                <label class='font-weight-bold col-5'>Xử lý :</label>
                                <div class='col-7'>${report.solution}</div>
                            </div>`;
        }

        Swal.fire({
            title: '<b class="mt-5">Chi tiết yêu cầu dừng công việc đột xuất</b>',
            html:
                `<div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Người yêu cầu :</label>
                        <div class='col-7'>${report.user1_name}</div>                    
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Mã công việc :</label>
                        <div class='col-7'>${report.id_job}</div>                    
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Người làm :</label>
                        <div class='col-7'>${report.user2_name}</div>                    
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Ngày phản hồi :</label>
                        <div class='col-7'>${prettierDate(report.report_date)}</div>
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Tình trạng :</label>
                        ${statusText}
                    </div>
                    ${solutionText}
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Nội dung :</label>
                        <div class='col-7'>${report.content}</div>
                    </div>
                </div>`,
            showCloseButton: true,
            showConfirmButton: false,
            focusConfirm: false
        })
    }

    renderReportsList(reports, total) {
        let content = [];
        if (total === - 1) {
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
        else if (reports.length > 0) {
            reports.forEach((e, index) => {
                content.push(
                    <tr key={index}>
                        <td><div style={{ width: '90px' }}>{prettierDate(e.report_date)}</div></td>
                        <td><div className='text-truncate' style={{ width: '120px' }}>{e.user1_name}</div></td>
                        <td><div className='text-truncate' style={{ width: '50px' }}>{e.id_job}</div></td>
                        <td><div className='text-truncate' style={{ width: '120px' }}>{e.user2_name}</div></td>
                        <td>
                            {e.content}
                        </td>
                        {(
                            this.state.queryType === 0
                                ?
                                <td>
                                    <i className='icon-feather-user-check cursor-pointer text-primary' onClick={() => { this.handleChangeStatus(e) }}></i>
                                </td>
                                :
                                ''
                        )}                        
                        <td className='text-center'>
                            <i className='icon-feather-eye cursor-pointer text-primary' onClick={() => { this.handleDetail(e) }}></i>
                        </td>
                    </tr>);

            })
        }
        else {
            content.push(
                <tr key={0}>
                    <td colSpan='7' className='p-5'>
                        Danh sách yêu cầu ngưng việc rỗng !!
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
        let { jobReports, totalJobReports, currentJobReportsPage } = this.props.ReportsReducer;
        let totalPage = Math.ceil(totalJobReports / 8);

        return (
            <div className="container-fluid">
                {/* Page Heading */}
                <h1 className="h3 mb-2 text-gray-800">Quản lý yêu cầu sa thải của người dùng</h1>
                <p className="mb-4">
                    Danh sách các yêu cầu sa thải
                </p>
                {/* Userlist DataTales Example */}
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary"><i className="icon-feather-list" />&nbsp;&nbsp;Các yêu cầu sa thải</h6>
                    </div>
                    <div className="card-body">
                        {/* Headline */}
                        <div className="row my-1">
                            <div className='col-7'>
                                <div className="btn-group btn-group-sm" role="group">
                                    <div onClick={() => { if (this.state.queryType !== 0) { this.handleFilter(0) } }} className={"btn " + (this.state.queryType === 0 ? 'btn-danger' : 'btn-outline-danger')}>Chưa giải quyết</div>
                                    <div onClick={() => { if (this.state.queryType !== 1) { this.handleFilter(1) } }} className={"btn " + (this.state.queryType === 1 ? 'btn-success' : 'btn-outline-success')}>Đã giải quyết</div>
                                </div>
                            </div>
                            <div className="col-5 text-right d-flex">
                                <div className='mr-2'>
                                    <div className='btn btn-primary'
                                        onClick={() => {
                                            if (this.state.queryName.length > 0) {
                                                document.getElementById('user-search-input').value = '';
                                                this.setState({ queryName: '' }, () => {
                                                    this.loadJobListFunc(1, this.state.queryType, this.state.queryName);
                                                })
                                            }
                                        }}>
                                        <i className='icon-feather-rotate-ccw'></i>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="search" id="user-search-input" className="form-control" placeholder="Tìm kiếm theo người yêu cầu .." />
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
                                        <th>Ngày đăng</th>
                                        <th>Người yêu cầu</th>
                                        <th>Mã CV</th>
                                        <th>Người làm</th>
                                        <th>Nguyên nhân</th>
                                        {(
                                            this.state.queryType === 0
                                                ?
                                                <th>Xử lý</th>
                                                :
                                                ''
                                        )}
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderReportsList(jobReports, totalJobReports)}
                                </tbody>
                            </table>

                        </div>

                        {/* Pagination */}
                        {(
                            totalJobReports === 0
                                ?
                                ''
                                :
                                <nav aria-label="...">
                                    <ul className="pagination">
                                        <li className={"pagination-item " + ((currentJobReportsPage === 1 || totalPage - currentJobReportsPage < 3) && "d-none")}>
                                            <div className="cursor-pointer page-link" onClick={() => { this.handlePagination(currentJobReportsPage - 1); }}>
                                                <i className="icon-material-outline-keyboard-arrow-left" />
                                            </div>
                                        </li>
                                        {this.renderPagination(currentJobReportsPage, totalPage)}
                                        <li className={"pagination-item " + (totalPage - currentJobReportsPage < 3 && "d-none")}>
                                            <div className="cursor-pointer page-link" onClick={() => { this.handlePagination(currentJobReportsPage + 1); }}>
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
        onLoadJobReportList: (page, take, status, queryName) => {
            dispatch(loadJobReportList(page, take, status, queryName));
        },
        onRequestChangeStt: () => {
            dispatch({
                type: 'JOB_REPORT_LIST_REQUEST',
            })
        },
    }
}

const JobReports = withRouter(connect(mapStateToProps, mapDispatchToProps)(JobReportsComponent));
export default JobReports;